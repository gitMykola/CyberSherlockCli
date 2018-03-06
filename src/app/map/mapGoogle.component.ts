import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {InfoMonitor, MediaService, TaskService, TranslatorService, UserService} from '../_services';
import * as $ from 'jquery';
@Component ({
    selector: 'app-map',
    template: `<div class="slide-container" id="map">
        <agm-map id="gmap" title="{{ts.translate('menu.map')}}"
                 [latitude]="map.lat"
                 [longitude]="map.lng"
                 [zoom]="map.zoom"
                 [zoomControl]="false"
                (mapClick)="mapClick($event)">
            <agm-marker [latitude]="map.lat"
                        [longitude]="map.lng"
                        [markerClickable]="true"
                        [markerDraggable]="true"
                        [label]=""
            (markerClick)="mapClick($event)"
            (mouseOver)="mapClick($event)">
                <agm-info-window>Börk</agm-info-window>
            </agm-marker>
        </agm-map>
        <app-dash (onAction)="onAction($event)"></app-dash>
    </div>`
})
export class MapGoogleComponent implements AfterViewChecked {
    public map: {
        lat: number,
        lng: number,
        zoom: number
    };
    constructor (
        private _im: InfoMonitor,
        public ts: TranslatorService,
        public user: UserService,
        public task: TaskService,
        public media: MediaService
    ) {
        this.map = {
            lat: 46.4325695,
            lng: 30.7426535,
            zoom: 18
        };
    }
    ngAfterViewChecked () {
        const h = window.innerHeight,
            mapDom = document.querySelector('#map agm-map');
        if (mapDom.clientHeight !== h) {
            $(mapDom).css({height: h + 'px'});
        }
    }
    onAction(action: string) {
        this._im.add(action, 0);
    }
    mapClick(e: Event) {
        console.dir(e);
        /*const m: any = e;
        document.querySelector('#gmap')
            .innerHTML = '' +
            '<agm-marker [latitude]="' + m.coords.lat + '"[longitude]="'
            + m.coords.lng + '"[markerClickable]="true"[markerDraggable]="true"[label]=""' +
            '(markerClick)="mapClick($event)"(mouseOver)="mapClick($event)">' +
            '<agm-info-window>Börk</agm-info-window></agm-marker>';*/
    }
}
