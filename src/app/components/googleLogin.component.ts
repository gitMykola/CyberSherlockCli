import {Component, Input} from '@angular/core';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-glogin',
    template: `
        <button id="glogin"
                class="social-btn button-default col-12"
        (click)="glogin()">
            {{ts.translate('buttons.' + (lin ? 'enter_with' : 'genesis_with'))
        + ts.translate('buttons.glogin')}}
        </button>
    `
})
export class GoogleLoginComponent {
    @Input() lin: boolean;
    constructor (
        public ts: TranslatorService
    ) {}
    public glogin () {}
}
