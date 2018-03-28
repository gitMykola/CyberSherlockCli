import {AfterViewInit, Component, Input} from '@angular/core';
import {Media} from '../_services/elements';
import {MediaService, TranslatorService} from '../_services';
import {Form} from '@angular/forms';
import {anim} from './animations';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';

@Component ({
    selector: 'app-media-comp',
    template: `
        <div class="modal-component"
                    id="media-component" [@mediaShow]="media.showComponent">
            <form class="modal-form-component
                    col-sm-10 offset-sm-1
                    col-lg-8 offset-lg-2">
                <div class="form-block">
                    <button class="form-close"
                            title="{{ts.translate('buttons.close')}}"
                            (click)="mediaCancel($event)">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </button>
                </div>
                <div class="form-block">
                    <div class="card col-12 media-preview">
                        <div class="card-block text-center block-media">
                            <div class="block-video col-12 text-center">
                                <video autoplay [hidden]="imgPreview">
                                </video>
                                <img [src]="selectedURL" [hidden]="!imgPreview"/>
                                <div class="panel-block">
                                    <h6 class="col-12"
                                       *ngIf="media.url.length < 1">
                                        {{ts.translate('medias.add_media')}}</h6>
                                    <span (click)="enableVideo($event)"
                                          class="material-icons"
                                          title="{{ts.translate('medias.add_media')}}">
                                    camera_enhance
                                    </span>
                                </div>
                            </div>
                            <div class="block-img-preview col-12 text-center">
                                <img *ngFor="let msrc of media.url; index as ik"
                                     [src]="msrc"
                                     height="80px"
                                     (click)="enablePreview(ik)"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-block">
                    <div class="card col-sm-6 col-12">
                        <div class="card-block">
                            <label class="col-12" for="type">
                                {{ts.translate('medias.media_type')}}
                            </label>
                            <select class="col-12" name="type" (change)="changeMediaType($event)">
                                <option value="0" [selected]="media.type === 0">
                                    {{ts.translate('medias.media_type_0')}}</option>
                                <option value="1" [selected]="media.type === 1">
                                    {{ts.translate('medias.media_type_1')}}</option>
                                <option value="2" [selected]="media.type === 2">
                                    {{ts.translate('medias.media_type_2')}}</option>
                            </select>
                        </div>
                        <div class="card-block">
                            <label for="url" class="col-12">
                                {{ts.translate('medias.url')}}
                            </label>
                            <input *ngFor="let url of media.url; index as k"
                                   type="url" name="url_{{k}}"
                                   (input)="showValidateFormFieldError($event.target)"
                                   (change)="showValidateFormFieldError($event.target, 1)"
                                   placeholder="like http://domain.com/filename.jpg"
                                   class="col-12"
                                   [value]="url"
                            />
                            <button title="{{ts.translate('medias.preview')}}"
                            (click)="preview($event)">
                                {{ts.translate('medias.preview')}}
                            </button>
                        </div>
                    </div>
                    <div class="card col-sm-6 col-12">
                        <h5 class="card-header">
                            {{ts.translate('medias.location')}}
                        </h5>
                        <div class="card-block">
                            <label for="lat" class="col-12">
                                {{ts.translate('medias.latitude')}}
                            </label>
                            <input type="number" name="lat"
                                   (input)="showValidateFormFieldError($event.target)"
                                   (change)="showValidateFormFieldError($event.target, 1)"
                                   min="-90" max="90" placeholder="min -90, max 90"
                                   value="{{media.location.lat}}"
                                   class="col-12"
                            />
                        </div>
                        <div class="card-block">
                            <label for="lng" class="col-12">
                                {{ts.translate('medias.longitude')}}
                            </label>
                            <input type="number" name="lng"
                                   (input)="showValidateFormFieldError($event.target)"
                                   (change)="showValidateFormFieldError($event.target, 1)"
                                   min="-180" max="180" placeholder="min -180, max 180"
                                   value="{{media.location.lng}}"
                                   class="col-12"
                            />
                        </div>
                        <div class="card-block">
                            <label for="type" class="col-12">
                                {{ts.translate('medias.location_type')}}
                            </label>
                            <select class="col-12"
                                    name="type" (change)="changeLocationType($event)">
                                <option value="0" [selected]="media.location.type === 0">
                                    {{ts.translate('medias.location_type_0')}}</option>
                                <option value="1" [selected]="media.location.type === 1">
                                    {{ts.translate('medias.location_type_1')}}</option>
                                <option value="2" [selected]="media.location.type === 2">
                                    {{ts.translate('medias.location_type_2')}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-block button-block">
                    <button class="col-sm-3 col-sm-offset-6"
                            (click)="saveMedia($event)">
                        {{ts.translate('buttons.save')}}
                    </button>
                </div>
            </form>
        </div>
    `,
    animations: [
        trigger('mediaShow', [
            state('false', style({display: 'none', opacity: 0})),
            state('true', style({display: '*', opacity: 1})),
            transition('false => true', useAnimation(anim.fadeIn,
                {params: {
                        time: 300
                    }})),
            transition('true => false', useAnimation(anim.fadeOut,
                {params: {
                        time: 300
                    }}))
        ])
    ]
})
export class MediaComponent implements AfterViewInit {
    private _form: any;
    private _videoOn: boolean;
    private _canva: any;
    @Input() media: Media;
    public imgPreview: boolean;
    public selectedURL: any;
    constructor (
        public ts: TranslatorService,
        private ms: MediaService
    ) {
        this._videoOn = false;
        this._canva = null;
        this.imgPreview = false;
        this.selectedURL = null;
    }
    ngAfterViewInit () {
        this._form = document.querySelector('#media-component form');
        this._canva = document.createElement('canvas');
    }
    showValidateFormFieldError () {}
    mediaCancel (e: Event) {
        e.preventDefault();
        this.imgPreview = false;
        this.media.showComponent = false;
    }
    changeLocationType (e: Event) {
        e.preventDefault();
        if (this.media.local) {console.dir();
            this.media.location.type = e.currentTarget['value'];
        } else {
        return false;
        }
    }
    changeMediaType (e: Event) {
        e.preventDefault();
        if (this.media.local) {
            this.media.type = e.currentTarget['value'];
        } else {
            return false;
        }
    }
    saveMedia (e: Event) {
        e.preventDefault();
        this.media.showComponent = false;
    }
    preview (e: Event) {
        e.preventDefault();
        this.media.url = this._form.getElementsByTagName('input')['url'].value;
    }
    enableVideo (e: Event) {
        e.preventDefault();
        const video = document.querySelector('video');
        this._canva.height = video.videoHeight;
        this._canva.width = video.videoWidth;
        // this._canva.setAttribute('id', 'canvas_' + this.media.url.length);
        if (!this._videoOn) {
            navigator.mediaDevices
                .getUserMedia({video: {width: {min: 1280}, height: {min: 720}}})
                .then(stream => {
                    video.srcObject = stream;
                    this._videoOn = true;
                }).catch(err => {
                console.dir(err);
            });
        } else if (!this.imgPreview) {
            this.imgPreview = false;
            this._canva.getContext('2d').drawImage(video, 0, 0);
            this.media.url.push(this._canva.toDataURL('image/jpeg'));
        } else {
            this.imgPreview = false;
        }
    }
    enablePreview (k: number) {
        this.selectedURL = this.media.url[k];
        this.imgPreview = true;
    }
}
