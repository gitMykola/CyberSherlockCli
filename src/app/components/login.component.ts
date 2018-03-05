import {Component} from '@angular/core';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-login',
    template: `
        <div class="modal-block">
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
    `
})
export class LoginComponent {
    constructor (
        public ts: TranslatorService
    ) {}
    showValidateFormFieldError (target) {}
}
