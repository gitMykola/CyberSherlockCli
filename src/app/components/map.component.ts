import {Component} from '@angular/core';
import {ResizeService, TranslatorService, MapService} from '../_services';

@Component({
    selector: 'app-map',
    template: `
        <div id="map"></div>
    `
})
export class MapComponent {
    constructor (
        public ts: TranslatorService,
        public rs: ResizeService,
        public map: MapService
    ) {}
}
