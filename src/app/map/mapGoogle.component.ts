import {
    AfterViewChecked,
    Component
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
                <agm-info-window>
                    <img [src]="m.url" height="72" width="128">
                </agm-info-window>
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
        this.map = {
            lat: 46.4325695,
            lng: 30.7426535,
            zoom: 18
        };
        this.mediaHide = this.taskHide = this.peopleHide = false;
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
                draggable: true,
                iconUrl: '../../assets/img/icons/mapGPS/task_new_photo_.png',
                url: '../../assets/img/odessa.png',
                opacity: 1
            })
                .then(() => {
                    this
                        ._im.add(this.ts.translate('info.done'), 0);
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
