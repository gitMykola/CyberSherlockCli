import {AfterViewInit, Component, Input} from '@angular/core';
import {Media, Src} from '../_services/elements';
import {MediaService, TranslatorService} from '../_services';
import {Utils} from '../lib';
import {anim} from './animations';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import * as uploader from '../lib/uploader.js';
import {HttpClient} from '@angular/common/http';
import * as sha from 'sha.js';

@Component ({
    selector: 'app-media-comp',
    template: `
        <div class="modal-component"
                    id="media-component" [@mediaShow]="media.showComponent">
            <form class="modal-form-component
                    col-sm-10 offset-sm-1
                    col-lg-8 offset-lg-2">
                <div class="form-block">
                    <div class="card col-12 media-preview">
                        <div class="card-block text-center block-media">
                            <div class="block-video col-12 text-center">
                                <video autoplay [hidden]="imgPreview">
                                </video>
                                <img [src]="selectedURL" [hidden]="!imgPreview"/>
                                <div class="panel-block">
                                    <h6 class="col-12"
                                       *ngIf="media.sources.length < 1">
                                        {{ts.translate('medias.add_media')}}</h6>
                                    <span (click)="enableVideo($event)"
                                          class="material-icons"
                                          title="{{ts.translate('medias.add_media')}}">
                                    camera_enhance
                                    </span>
                                </div>
                                <div class="panel-block-right">
                                    <span (click)="mediaCancel($event)"
                                          class="material-icons"
                                          title="{{ts
                                          .translate('buttons.close')}}">
                                    exit_to_app
                                    </span>
                                    <span (click)="saveToGDrive($event)"
                                          *ngIf="selectedURL"
                                          class="material-icons"
                                          title="{{ts
                                          .translate('medias.save_to_google_drive')}}">
                                    cloud_upload
                                    </span>
                                    <span (click)="delete($event)"
                                          *ngIf="selectedURL"
                                          class="material-icons"
                                          title="{{ts
                                          .translate('actions.delete')}}">
                                    delete_forever
                                    </span>
                                </div>
                            </div>
                            <div class="block-img-preview col-12 text-center">
                                <img *ngFor="let msrc of media.sources; index as ik"
                                     [src]="msrc.src"
                                     height="80px"
                                     (click)="enablePreview(ik)"/>
                            </div>
                        </div>
                    </div>
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
    private  _video: any;
    private _canva: any;
    @Input() media: Media;
    public imgPreview: boolean;
    public selectedURL: string;
    public selectedIndex: number;
    public mediaFile: File;
    constructor (
        public ts: TranslatorService,
        private ms: MediaService,
        private http: HttpClient
    ) {
        this._videoOn = false;
        this._canva = this._video = null;
        this.imgPreview = false;
        this.selectedURL = '';
        this.selectedIndex = 0;
    }
    ngAfterViewInit () {
        this._form = document.querySelector('#media-component form');
        this._video = document.querySelector('video');
        this._canva = document.createElement('canvas');
    }
    showValidateFormFieldError () {}
    mediaCancel (e: Event) {
        e.preventDefault();
        this.imgPreview = false;
        this.media.showComponent = false;
        if (this._videoOn) {
            this._video.srcObject = null;
            this._videoOn = false;
        }
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
        this.media.sources = this._form.getElementsByTagName('input')['url'].value;
    }
    enableVideo (e: Event) {
        e.preventDefault();
        this._canva.height = this._video.videoHeight;
        this._canva.width = this._video.videoWidth;
        if (!this._videoOn) {
            navigator.mediaDevices
                .getUserMedia({video: {width: {min: 1280}, height: {min: 720}}})
                .then(strm => {
                    this._video.srcObject = strm;
                    this._videoOn = true;
                }).catch(err => {
                console.dir(err);
            });
        } else if (!this.imgPreview) {
            this.imgPreview = false;
            this._canva.getContext('2d').drawImage(this._video, 0, 0);
            const time = (new Date()).getTime();
            this.media.sources.push({
                src: this._canva.toDataURL('image/jpeg'),
                time: time,
                location: this.media.location
            });
            this.selectedURL = this.media.sources[this.media.sources.length - 1].src;
            this.selectedIndex = this.media.sources.length - 1;
        } else {
            this.imgPreview = false;
        }
    }
    enablePreview (k: number) {
        this.selectedURL = this.media.sources[k].src;
        this.selectedIndex = k;
        this.imgPreview = true;
    }
    saveToGoogleDrive (file: File) {
        try {
            // const nFile = new ReadableStreamReader(); // stream.Rea .File.Reader({path: this.media.url[0]}); /*fetch(this.media.url[0])
            // da5698be17b9b46962335799779fbeca8ce5d491c0d26243bafef9ea1837a9d8
            // const reader = new FileReader();
            let nFile = this.media.url[0];
            let size = '';
            const src = this.media.url[0].split(',')[1];
            let resp: any = '';
            // htp = this.http;
            Utils.srcToFile([
                {src: this.media.url[0],
                 filename: 'newFile.jpg',
                 mimeType: 'image/jpeg'}
            ]).next().value
            .then(function (file) { // make all Google Auth instance
                console.dir(file[0]);
                console.log(file[0]['name'] + ' ' + file[0]['size']);
                console.log(sha('sha256').update(file[0]).digest('hex'));
                nFile = file[0];
                size = file[0]['size'];
                return true;
            })
                .then(res => {
                    resp = res;
                    const GoogleAuth = window['gapi'].auth2.getAuthInstance();
                    GoogleAuth.isSignedIn.listen();
                    if (!GoogleAuth.isSignedIn.get()) {
                        return GoogleAuth.signIn();
                    } else {
                        return true;
                    }
                })
                .then(function (gauth) {
                    if (!gauth) {console.log('No GAuth');
                        return false;
                    } else {console.dir(nFile);
                        const upl = new uploader.MediaUploader({
                            metadata: {
                                'title': 'newFile.jpg',
                                'name': 'newFile.jpg'
                            },
                            permissions: ['anyone'],
                            file: nFile,
                            token: window['gapi'].auth2.getAuthInstance()
                                .currentUser.get().Zi.access_token,
                            onComplete: (data) => {
                                const dt = JSON.parse(data);
                                console.dir(dt['id']);
                                console.dir(window['gapi']);
                                window['gapi'].client.request({
                                    path: 'https://www.googleapis.com/drive/v3/files/'
                                    + dt.id + '/permissions',
                                    method: 'POST',
                                    callback: response => {
                                            console.dir(response);
                                        },
                                    body: {
                                        role: 'reader',
                                        type: 'anyone'
                                    }
                                });
                            },
                            onError: (error) => {
                                console.dir(error);
                            }
                        });
                        return upl.upload();
                        /*return window['gapi'].client.drive.files.create({
                            resource: nFile,
                            media: {
                                mimeType: 'image/jpeg'
                            },
                            fields: 'id'
                        }, function (err, f) { console.log('Done gdrive ...');
                            if (err) {
                                return console.dir(err);
                            } else {
                                return console.dir(f);
                            }
                    });*/
                        /*return window['gapi'].client
                            .request({
                                'path': '/upload/drive/v1/files?uploadType=media',
                                'method': 'POST',
                                'title': 'newFile.jpg',
                                'params': {
                                    'uploadType': 'media',
                                    'name': 'newFile.jpg'
                                },
                                'headers': {
                                    'Content-Type': 'image/jpeg',
                                    'Content-Transfer-Encoding': 'base64'
                                },
                                'resource': src
                            })
                            .execute(function (err, f) { console.log('Done gdrive ...');
                            if (err) {
                                return console.log(err);
                            } else {
                                return console.dir(f);
                            }
                        });*/
                    }
                })
                .then(fk => console.dir(fk))
                .catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
    }
    saveToGDrive() {
        console.dir(this.media);
        console.dir(this.selectedIndex);
        this.createFiles(this.media.sources[this.selectedIndex])
            .then(files => {
                console.dir(files[0] || 'null');
                console.log(this.makeSha256(files[0]));
            })
            .catch(error => {
                console.log(error);
            });
    }
    createFiles(src: Src) {
        return new Promise((resolve, reject) => {
            const fileName = src.time + 'LAT' + src.location.lat.toString()
                .replace('.', 'P') + 'LNG' + src.location
                .lng.toString().replace('.', 'P') + '.jpg';
            Utils.srcToFile([
                {src: src.src,
                    filename: fileName,
                    mimeType: 'image/jpeg'}
            ]).next().value
                .then(function (files) {
                    return resolve(files);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }
    delete(e: Event) {
        e.preventDefault();
        this.media.sources = this.media.sources.filter((src, ind) => {
            return ind !== this.selectedIndex;
        });
        this.selectedIndex = this.selectedIndex > 0 ? --this.selectedIndex : 0;
        this.selectedURL = this.media.sources[this.selectedIndex].src || '';
    }
    sendTo() {}
    makeSha256(file: File) {
        try {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event: any) => {
                const shaF = sha('sha256');
                console.log(shaF.update(event.target.result).digest('hex'));
            };
            reader.onerror = (error: any) => console.log(error);
        } catch (error) {
            console.log(error);
        }
    }
}
