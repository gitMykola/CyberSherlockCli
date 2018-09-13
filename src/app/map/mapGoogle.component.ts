import {
    AfterViewChecked,
    Component, OnInit
} from '@angular/core';
import {
  ActionMonitor,
  InfoMonitor,
  MediaService,
  PeopleService,
  TaskService,
  TranslatorService,
  UserService
} from '../_services';
import * as $ from 'jquery';
import {config} from '../config';
import {Media, People, Task, Location} from '../lib/classes';
import {Subscription} from "rxjs";
@Component ({
    selector: 'app-map',
    template: `<div class="slide-container" id="map">
        <agm-map id="gmap" title="{{ts.translate('menu.map')}}"
                 [latitude]="map.lat"
                 [longitude]="map.lng"
                 [zoom]="map.zoom"
                 [zoomControl]="false"
                 [mapTypeControl]="true"
                (mapClick)="mapClick($event)">
            <agm-marker *ngFor="let m of media.medias; index as k"
                    [latitude]="m.location.getLocation().lat"
                    [longitude]="m.location.getLocation().lng"
                    [markerClickable]="true"
                    [markerDraggable]="m.draggable"
                    [iconUrl]="m.iconUrl"
                    (markerClick)="mediaMarkerClick(m)"
                    (dragEnd)="mediaMarkerDrag(m, $event)"
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
        <app-media-comp></app-media-comp>
    </div>`
})
export class MapGoogleComponent implements OnInit, AfterViewChecked {
    private _currentLocation: Location;
    private _autoLocation: boolean;
    public map: {
        lat: number,
        lng: number,
        zoom: number,
        iconUrl: string
    };
    public mediaHide: boolean;
    public taskHide: boolean;
    public peopleHide: boolean;
    public mediaOpen: boolean;
    public taskOpen: boolean;
    public peopleOpen: boolean;
    public selectedMedia: Media;
    public selectedPeople: People;
    public selectedTask: Task;
    public act: Subscription;
    constructor (
        private _im: InfoMonitor,
        private _am: ActionMonitor,
        public ts: TranslatorService,
        public user: UserService,
        public task: TaskService,
        public media: MediaService,
        public people: PeopleService,
    ) {
        this.map = Object.assign(config().app.map.default_sets);
        this.mediaHide = false;
        this.taskHide = false;
        this.peopleHide = false;
        this.mediaOpen = false;
        this.peopleOpen = false;
        this.taskOpen = false;
        this.selectedMedia = new Media({});
        this.selectedPeople = new People({});
        this.selectedTask = new Task({});
        this.act = this._am.onAction$.subscribe(data => {
          console.dir(data);
          if (['task', 'media', 'people'].indexOf(data.object) >= 0) {
            this.onAction(data);
          }
        });
        this._currentLocation = new Location();
    }
    ngOnInit () {
        this.setMapCenter();
        this.mediaOpen = false;
    }
    setMapCenter (data: any = null) {
        try {
            if (navigator.geolocation && !data) {
                navigator.geolocation.getCurrentPosition( position => {
                    this.map.lat = position.coords.latitude;
                    this.map.lng = position.coords.longitude;
                    this.map.zoom = 18;
                    this._autoLocation = true;
                    this._currentLocation.setLocation(this.map.lat, this.map.lng);
                    this._currentLocation.setType(2);
                }, error => {
                    this._im.add(this.ts.translate('info.manual_location'), 1);
                    this._autoLocation = false;
                });
            } else {
                this.map.lat = data['lat'] || 0;
                this.map.lng = data['lng'] || 0;
                this._currentLocation.setLocation(this.map.lat, this.map.lng);
                this._currentLocation.setType(1);
                this._im.add(this.ts.translate('info.manual_location'), 1);
                this._autoLocation = false;
            }
        } catch (e) {
            this._im.add(e, 2);
            this._autoLocation = false;
        }
    }
    ngAfterViewChecked () {
        const h = window.innerHeight,
            mapDom = document.querySelector('#map agm-map');
        if (mapDom.clientHeight !== h) {
            $(mapDom).css({height: h + 'px'});
        }
    }
    onAction(action: any) {
        this._im.add(action.object + ' ' + action.action, 0);
        const data = {
          location: this._currentLocation.getLocation()
        };
          if (this[action.object] && this[action.object][action.action]) {
            this[action.object][action.action](data)
              .then(result => {
                // TODO add selected sign to marker object independed from category
                if (['add', 'edit'].indexOf(action.action) >= 0) {
                  if (['add'].indexOf(action.action) >= 0) {
                    this.media.select(this.media.medias.length - 1);
                  }
                  this._am.onAction$.emit({
                    object: 'media',
                    action: 'openMedia'
                  });
                }
              })
              .catch(error => {
                this._im.add(this.ts.translate('info.error')
                  + ' ' + error.message, 1);
              });
          }
    }
    mapClick(e: any) {
        try {
            this.setMapCenter({
              lat: e.coords.lat,
              lng: e.coords.lng
            });
            this._im.add(e.coords.lat + ' ' + e.coords.lng, 0);
        } catch (err) {
            this._im.add(err.message, 2);
        }
    }
    mediaAct(action: string) {
        if (action === 'add') {
            this.media.add({
                    lat: this.map.lat,
                    lng: this.map.lng
            })
                .then(mediaIndex => {
                    this.selectedMedia.deselect();
                    this.selectedMedia = this.media
                        .medias[this.media.medias.length - 1];
                    this.selectedMedia.select();
                    // this._im.add(this.ts.translate('info.done'), 0);
                    // console.dir(this.selectedMedia);
                })
                .catch(e => this
                    ._im.add(this.ts.translate('info.error') + ' ' + e.message, 1));
        }
        if (action === 'hide') {
            this.media.medias.forEach(m => m.opacity = m.opacity ? 0 : 1);
            this.mediaHide = !this.mediaHide;
        }
        if (action === 'edit') {
        }
    }
    taskAct(action: string) {}
    peopleAct(action: string) {}
    mediaMarkerClick(med: Media) {
        this.selectedMedia.deselect();
        this.selectedMedia = med;
        this.selectedMedia.select();
    }
    mediaMarkerDrag(med: Media, e: Event) {
        med.setLocation(e['coords']);
        this.mediaMarkerClick(med);
    }
}

