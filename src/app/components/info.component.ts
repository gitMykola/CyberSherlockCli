import {Component} from '@angular/core';
import {InfoMonitor, TranslatorService} from '../_services';
import {DT} from '../lib/classes/DT';

@Component ({
    selector: 'app-info',
    template: `
        <div id="info-monitor">
        </div>
        <table class="info-content">
            <tr class="info-header">
                <th>{{ts.translate('labels.date')}}</th>
                <th>{{ts.translate('labels.time')}}</th>
                <th>{{ts.translate('labels.message')}}</th>
            </tr>
            <tr *ngFor="let info of im.info"
            class="info {{info.type === 2 ? 'error' : info.type === 1 ? 'warrning' : ''}}">
                <td>{{dt.toDate(info.time)}}</td>
                <td>{{dt.toTime(info.time)}}</td>
                <td>{{info.info}}</td>
            </tr>
        </table>
    `,
    styles: [`
        #info-monitor .last {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
        }
    `]
})
export class InfoComponent {
    public dt = DT;
    constructor (
        public im: InfoMonitor,
        public ts: TranslatorService
    ) {}
}
