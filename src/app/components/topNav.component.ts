import {TranslatorService} from '../_services';
import {Component} from '@angular/core';
import {config} from '../config';

@Component ({
    selector: 'app-topnav',
    template: `
    <ul class="nav justify-content-end">
      <li class="nav-item" *ngFor="let item of _menu">
        <a class="nav-link active" href="#">{{ts.translate('menu.' + item)}}</a>
      </li>
    </ul>
    `
})
export class TopNavComponent {
    _menu: object;
    constructor (
        public ts: TranslatorService
    ) {
        this._menu = config().app.topnav;
    }
}