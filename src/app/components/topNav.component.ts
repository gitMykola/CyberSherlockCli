import {
    ActionMonitor,
    InfoMonitor,
    TranslatorService
} from '../_services';
import {
    AfterViewInit,
    Component
} from '@angular/core';
import {config} from '../config';
import {UserService} from '../_services';

@Component ({
    selector: 'app-topnav',
    template: `
    <ul class="nav justify-content-end list" id="topnav">
      <li class="nav-item" *ngFor="let item of _menu index as i"
          routerLinkActive="active"
          [hidden]="item.disabled
          || (item.name === 'exit' && !user.user.auth)
          || (item.name === 'enter' && user.user.auth)">
        <a class="nav-link" (click)="action($event, item.name)"
           routerLink="{{item.name}}">
            <span class="material-icons">{{item.icon}}</span>
            <span class="text">{{ts.translate('menu.' + item.name)}}</span>
        </a>
      </li>
    </ul>
    `
})
export class TopNavComponent implements AfterViewInit {
    _menu: object;
    constructor (
        public ts: TranslatorService,
        public user: UserService,
        public im: InfoMonitor,
        private _am: ActionMonitor
    ) {
        this._menu = config().app.topnav;
    }
    ngAfterViewInit () {
        this._menu = config().app.topnav;
    }
    action (e: Event, name: string) {
        e.preventDefault();
       // this.user.authen(name);
        this.im.add(name, 0);
        // if (name === 'exit') {
        //    this.user.userLogout();
        // } else {
            this._am.onAction$.emit(name);
        // }
    }
    enter () {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://apis.google.com/js/api.js';
        script.addEventListener('load', () => {
            console.log('load');
            const w: any = window,
            gapi = w.gapi;
            console.dir(gapi);
            gapi.load('client:auth2', () => {
                console.dir(gapi);
                gapi.client.init({
                    apiKey: config().app.google.apiKey,
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                    clientId: config().app.google.clientId,
                    scope: 'profile'
                })
                    .then(() => {
                        const GoogleAuth = gapi.auth2.getAuthInstance();
                        GoogleAuth.isSignedIn.listen();
                        if (!GoogleAuth.isSignedIn.get()) {
                            GoogleAuth.signIn();
                        }
                        const user = GoogleAuth.currentUser.get();
                        console.dir(user);
                        console.dir(gapi);
                    })
                    .catch(err => this.im.add(err, 2));
            });
        });
        document.body.appendChild(script);
    }
}
