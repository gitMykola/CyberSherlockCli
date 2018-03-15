import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActionMonitor, InfoMonitor, TranslatorService, UserService} from '../_services';
import {anim} from './animations';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';
import {_localeFactory} from "@angular/core/src/application_module";

@Component({
    selector: 'app-login',
    template: `
        <div [@login]="show"
                class="modal-block">
            <form class="form login-form
                        col-sm-6 offset-sm-3
                        col-lg-4 offset-lg-4" id="loginForm">
                <div class="form-block">
                    <button class="form-close"
                            title="{{ts.translate('buttons.close')}}"
                            (click)="show = false">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </button>
                </div>
                <div class="form-block flex-row">
                    <button class="col-sm-6
                                select-btn {{ + lin ? 'active' : ''}}"
                                (click)="loginSwitch($event, true)">
                        {{ts.translate('buttons.enter')}}
                    </button>
                    <button class="col-sm-6
                                select-btn {{ + !lin ? 'active' : ''}}"
                                (click)="loginSwitch($event, false)">
                        {{ts.translate('buttons.genesis')}}
                    </button>
                </div>
                <div class="form-block flex-column">
                    <label for="email" class="col-12">
                        {{ts.translate('labels.email')}}
                    </label>
                    <input type="text" name="email"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div class="form-block flex-column">
                    <label for="phone">
                        {{ts.translate('labels.phone')}}
                    </label>
                    <input type="text" name="phone"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div class="form-block flex-column">
                    <label for="passphrase">
                        {{ts.translate('labels.passphrase')}}
                    </label>
                    <input type="password" name="passphrase"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div [@ln]="lin" class="form-block flex-column">
                    <label for="cpassphrase">
                        {{ts.translate('labels.cpassphrase')}}
                    </label>
                    <input type="password" name="cpassphrase" *ngIf="!lin"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div class="form-block button-block text-center">
                    <button class="col-sm-6 col-sm-offset-3"
                    (click)="localLogin($event)">
                        {{ts.translate('buttons.' + (lin ? 'login' : 'create'))}}
                    </button>
                </div>
                <div class="form-block button-block social-block flex-column">
                    <app-glogin [lin]="lin"></app-glogin>
                    <app-flogin [lin]="lin"></app-flogin>
                    <app-llogin [lin]="lin"></app-llogin>
                    <app-tlogin [lin]="lin"></app-tlogin>
                </div>
            </form>
        </div>
    `,
    animations: [
        trigger('login', [
            state('false', style({display: 'none', opacity: 0})),
            state('true', style({display: 'block', opacity: 1})),
            transition('false => true', useAnimation(anim.fadeIn,
                {params: {
                        time: 300
                    }})),
            transition('true => false', useAnimation(anim.fadeOut,
                {params: {
                        time: 300
                    }}))
        ]),
        trigger('ln', [
            state('true', style({height: '0px'})),
            state('false', style({height: '*'})),
            transition('true => false', useAnimation(anim.scrollIn,
                {params: {
                        time: 300
                    }})),
            transition('false => true', useAnimation(anim.scrollOut,
                {params: {
                        time: 300
                    }}))
        ])
    ]
})
export class LoginComponent implements OnInit, OnDestroy {
    public lin: boolean;
    public show: boolean;
    private _action: Subscription;
    private _loginForm: any;
    constructor (
        public ts: TranslatorService,
        public im: InfoMonitor,
        private _am: ActionMonitor,
        private _user: UserService,
    ) {
        this.show = false;
        this.lin = true;
    }
    ngOnInit () {
        this._action = this._am.onAction$
            .subscribe(action => {
                return action.action === 'enter' ? this.loginAction() : null;
            });
        this._loginForm = document.querySelector('#loginForm');
    }
    ngOnDestroy () {
        if (this._action) {
            this._am.onAction$.unsubscribe();
        }
    }
    loginAction () {
        this.show = true;
    }
    loginSwitch (e: Event, stateLin: boolean) {
        e.preventDefault();
       this.lin = stateLin;
    }
    showValidateFormFieldError (target: any, showError: boolean = false) {
        const tElement = target.previousElementSibling;
        if (!this.validateField(target)) {
            // $(target.previousElementSibling).css({color: this._styles.errorColor});
            tElement.className = (tElement.className.indexOf(' error-form-field') < 0) ?
                tElement.className.concat(' error-form-field') :
                tElement.className;
            if (showError) {
                this.im.add(target.name + ' '
                + this.ts.translate('err.' + target.name), 2);
            }
        } else {
            // $(target.previousElementSibling).css({color: this._styles.mainColor});
            tElement.className = tElement.className
                .replace(' error-form-field', '');
        }
    }
    validateField (target)  {
        const valid = {
            email: function (value) {
                return (typeof(value) === 'string'
                    && (value.length === 0
                    || null !== value.match
(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)));
            },
            phone: function (value) {
                return (typeof(value) === 'string'
                    && (value.length === 0
                    || null !== value.match
                    (/^\+\d{12}$/)
                    && value.length === 13));
            },
            passphrase: function (value) {
                return (typeof(value) === 'string'
                    && value.length >= 8
                    && value.length < 256);
            },
            cpassphrase: function (value) {
                return (typeof(value) === 'string'
                    && value.length >= 8
                    && value.length < 256);
            }
        };
        return valid[target.name] ? valid[target.name](target.value) : false;
    }
    formValidate (form) {
        return new Promise( (resolve, reject) => {
            try {
                const fields = form.getElementsByTagName('input');
                let emph = false, ps, cps;
                for (let i = 0; i < fields.length; i++) {
                    if (!fields.item(i).disabled && !this.validateField(fields.item(i))) {
                        reject(fields.item(i));
                    }
                    if ((fields.item(i).name === 'email' && fields.item(i).value.length)
                        || (fields.item(i).name === 'phone' && fields.item(i).value.length)) {
                        emph = true;
                    }
                    if (fields.item(i).name === 'passphrase') {
                        ps = fields.item(i);
                    }
                    if (fields.item(i).name === 'cpassphrase') {
                        cps = fields.item(i);
                    }
                }
                if (!emph) {
                    reject(emph);
                }
                if (cps && ps.value !== cps.value) {
                    reject(cps);
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
    localLogin (e: Event) {
        e.preventDefault();
        // this.im.add(this.lin ? 'login' : 'create', 0);
        try {
            this.formValidate(this._loginForm)
                .then(() => {console.dir('Ok');
                    this.im.add('Server send', 0);
                    console.dir(this._loginForm.email);
                    this._user.createLocalUser({
                        passphrase: this._loginForm.passphrase.value,
                        email: this._loginForm.email.value,
                        phone: this._loginForm.phone.value
                    })
                        .then(user => {
                            console.dir(user);
                        }).catch(err => {
                            console.dir(err);
                    });
                })
                .catch(err => {console.dir(err);
                    if (err === false) {
                        this.im.add(this.ts
                            .translate('err.email_or_phone') , 2);
                    } else if (err.name === 'cpassphrase') {
                        this.im.add(this.ts
                            .translate('err.passphrase_cpass') , 2);
                    } else {
                        this.im.add(err.name || err, 2);
                    }
                });
        } catch (e) {
            this.im.add(e, 2);
        }
    }
}
