import { Component, OnInit } from '@angular/core';
import {TranslatorService} from '../_services';
@Component ({
    selector: 'app-map',
    template: `<div class="container">
        <h3>{{ts.translate('menu.map')}}</h3>
    </div>`
})
export class MapComponent {
    constructor (
        public ts: TranslatorService
    ) {}
}
