import {Component} from '@angular/core';
import {TranslatorService} from '../_services';
import {anim} from './animations';
import {transition, trigger, useAnimation} from '@angular/animations';

@Component({
    selector: 'app-login',
    template: `
        <div [@login]="show"
                class="modal-block">
            <form class="login-form">
                <div class="form-block">
                    <button class="form-close"
                            title="{{ts.translate('buttons.close')}}">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </button>
                </div>
                <div class="form-block">
                    <label for="email">
                        {{ts.translate('labels.email')}}
                    </label>
                    <input type="text" name="email"/>
                </div>
            </form>
        </div>
    `,
    animations: [
        trigger('login', [
            transition('* => true', useAnimation(anim.fadeIn,
                {params: {
                        time: 500
                    }})),
            transition('true => false', useAnimation(anim.fadeOut,
                {params: {
                        time: 500
                    }}))
        ])
    ]
})
export class LoginComponent {
    public show: boolean;
    constructor (
        public ts: TranslatorService
    ) {
        this.show = false;
    }
    showValidateFormFieldError (target) {}
}
