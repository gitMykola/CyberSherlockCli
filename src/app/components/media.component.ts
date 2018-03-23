import {Component, Input} from '@angular/core';
import {Media} from '../_services/elements';
import {MediaService, TranslatorService} from '../_services';
import {Form} from '@angular/forms';
import {anim} from './animations';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';

@Component ({
    selector: 'app-media-comp',
    template: `
        <div id="media-component" [@mediaShow]="true"
             class="modal-component
                    col-sm-8 offset-sm-2
                    col-lg-6 offset-lg-3">
            <form class="modal-form-component">
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
                    <div class="card col-12">
                        <h5 class="card-header col-12">
                            {{ts.translate('labels.location')}}
                        </h5>
                        <div class="card-block col-12">
                            <label for="lat" class="col-12">
                                {{ts.translate('labels.latitude')}}
                            </label>
                            <input type="number" name="lat"
                                   (input)="showValidateFormFieldError($event.target)"
                                   (change)="showValidateFormFieldError($event.target, 1)"
                                   min="-90" max="90" placeholder="min -90, max 90"
                                   value="media.location.lat"
                                   class="col-12"
                            />
                        </div>
                        <div class="card-block col-12">
                            <label for="lng" class="col-12">
                                {{ts.translate('labels.longitude')}}
                            </label>
                            <input type="number" name="lng"
                                   (input)="showValidateFormFieldError($event.target)"
                                   (change)="showValidateFormFieldError($event.target, 1)"
                                   min="-180" max="180" placeholder="min -180, max 180"
                                   value="media.location.lng"
                                   class="col-12"
                            />
                        </div>
                        <div class="card-block col-12">
                            <label for="lng" class="col-12">
                                {{ts.translate('labels.type')}}
                            </label>
                            <input type="number" name="lng"
                                   value="media.type" disabled
                            />
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
export class MediaComponent {
    private _form: any;
    @Input() media: Media;
    constructor (
        public ts: TranslatorService,
        private ms: MediaService
    ) {
        this._form = document.querySelector('#media-component');
    }
    showValidateFormFieldError () {}
    mediaCancel (e: Event) {
        e.preventDefault();
        this.media.showComponent = false;
    }
}
