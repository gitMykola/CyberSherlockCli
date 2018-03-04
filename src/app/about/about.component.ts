import { Component, OnInit } from '@angular/core';
import {TranslatorService} from '../_services';
@Component ({
    selector: 'app-about',
    template: `<div class="container">
        <h3>{{ts.translate('menu.about')}}</h3>
    </div>`
})
export class AboutComponent {
    constructor (
        public ts: TranslatorService
    ) {}
}
