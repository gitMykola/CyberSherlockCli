import {
    AfterViewChecked,
    Component, OnInit
} from '@angular/core';
import {
    InfoMonitor,
    MediaService,
    PeopleService,
    TaskService,
    TranslatorService,
    UserService
} from '../_services';
import * as $ from 'jquery';
import {config} from "../config";
@Component ({
    selector: 'app-map',
    template: `<div class="slide-container" id="map">
        <agm-map id="gmap" title="{{ts.translate('menu.map')}}"
                 [latitude]="map.lat"
                 [longitude]="map.lng"
                 [zoom]="map.zoom"
                 [zoomControl]="false"
                 [mapTypeControl]="true"
                (mapClick)="mapClick($event)"
                (centerChange)="mapCenterChange($event)">
            <agm-marker *ngFor="let m of media.medias; index as k"
                    [latitude]="m.location.lat"
                    [longitude]="m.location.lng"
                    [markerClickable]="true"
                    [markerDraggable]="m.draggable"
                    [iconUrl]="m.iconUrl"
                    (markerClick)="mediaMarkerClick(k)"
                    (dragEnd)="mapClick($event)"
                    [opacity]="m.opacity">
                <agm-info-window *ngIf="!m.local">
                    <img [src]="m.url" height="72" width="128">
                </agm-info-window>
            </agm-marker>
            <agm-marker [latitude]="map.lat"
                        [longitude]="map.lng"
                        [markerClickable]="true"
                        (markerClick)="user.gAuth()"
                        [iconUrl]="map.iconUrl">
                <agm-info-window>
                    <p>Map center</p>
                </agm-info-window>
            </agm-marker>
        </agm-map>
        <app-dash (onAction)="onAction($event)"></app-dash>
    </div>`
})
export class MapGoogleComponent implements OnInit, AfterViewChecked {
    public map: {
        lat: number,
        lng: number,
        zoom: number,
        iconUrl: string
    };
    public mediaHide: boolean;
    public taskHide: boolean;
    public peopleHide: boolean;
    constructor (
        private _im: InfoMonitor,
        public ts: TranslatorService,
        public user: UserService,
        public task: TaskService,
        public media: MediaService,
        public people: PeopleService
    ) {
        this.map = Object.assign(config().app.map.default_sets);
        this.mediaHide = this.taskHide = this.peopleHide = false;
    }
    ngOnInit () {
        this.setMapCenter();
        /*navigator.mediaDevices.getUserMedia({video: true})
            .then(stream => document.querySelector('video').srcObject = stream);
        navigator.mediaDevices.enumerateDevices()
            .then(devs => {
                console.dir(devs);
            });
        console.dir(navigator.mediaDevices.getSupportedConstraints());*/
    }
    setMapCenter () {
        /*try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( position => {
                    this.map.lat = position.coords.latitude;
                    this.map.lng = position.coords.longitude;
                    this.map.zoom = 18;
                }, error => {
                    this._im.add(this.ts.translate('info.manual_location'), 1);
                });
            } else {
                this._im.add(this.ts.translate('info.manual_location'), 1);
            }
        } catch (e) {
            this._im.add(e, 2);
        }*/
    }
    ngAfterViewChecked () {
        const h = window.innerHeight,
            mapDom = document.querySelector('#map agm-map');
        if (mapDom.clientHeight !== h) {
            $(mapDom).css({height: h + 'px'});
        }
    }
    onAction(action: any) {
        this._im.add(action.category + ' ' + action.action, 0);
        if (action.category === 'media') {
            this.mediaAct(action.action);
        }
        if (action.category === 'task') {
            this.taskAct(action.action);
        }
        if (action.category === 'people') {
            this.peopleAct(action.action);
        }
    }
    mapClick(e: any) {
        try {
            this._im.add(e.coords.lat + ' ' + e.coords.lng, 0);
        } catch (err) {
            this._im.add(err.message, 2);
        }
    }
    mapCenterChange(e: any) {
        try {
            this.map.lat = e.lat;
            this.map.lng = e.lng;
        } catch (err) {
            this._im.add(err.message, 2);
        }
    }
    mediaAct(action: string) {
        if (action === 'add') {
            this.media.addMedia({
                location: {
                    lat: this.map.lat,
                    lng: this.map.lng
                },
                local: true,
                draggable: true,
                iconUrl: '../../assets/img/icons/mapGPS/task_new_photo_.png',
                url: '../../assets/img/odessa.png',
                opacity: 1
            })
                .then(() => {
                    this._im.add(this.ts.translate('info.done'), 0);
                    console.dir(this.media.medias);
                })
                .catch(e => this
                    ._im.add(this.ts.translate('info.error') + ' ' + e.message, 1));
        }
        if (action === 'hide') {
            this.media.medias.forEach(m => m.opacity = m.opacity ? 0 : 1);
            this.mediaHide = !this.mediaHide;
        }
    }
    taskAct(action: string) {}
    peopleAct(action: string) {}
    mediaMarkerClick(index: number) {
        this.media.medias.forEach(m => m.iconUrl = m.iconUrl.replace('active', ''));
        this.media.medias[index].iconUrl = '../../assets/img/icons/mapGPS/task_new_photo_active.png';
    }
}
