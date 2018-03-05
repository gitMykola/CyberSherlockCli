import {TranslatorService} from '../_services';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {config} from '../config';
import {UserService} from '../_services';

@Component ({
    selector: 'app-topnav',
    template: `
    <ul class="nav justify-content-end list" id="topnav">
      <li class="nav-item" *ngFor="let item of _menu index as i"
          routerLinkActive="active"
          [hidden]="item.disabled
          || (item.name === 'exit' && !user.auth)
          || (item.name === 'enter' && user.auth)">
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
        public user: UserService
    ) {
        this._menu = config().app.topnav;
    }
    ngAfterViewInit () {
        this._menu = config().app.topnav;
    }
    action (e: Event, name: string) {
        e.preventDefault();
        this.user.authen(name);
    }
}
