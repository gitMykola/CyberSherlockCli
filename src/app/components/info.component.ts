import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {InfoMonitor, TranslatorService} from '../_services';
import {Info} from '../_services/elements';
import {transition, trigger, useAnimation} from '@angular/animations';
import {anim} from './animations';

@Component ({
    selector: 'app-info',
    template: `
        <div id="info-monitor">
            <div class="last">{{lastInfo.info}}
            </div>
        </div>
        <>
    `,
    styles: [`
        #info-monitor .last {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
        }
    `],
    animations: [
        trigger('last', [
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
export class InfoComponent implements OnInit{
    private _newInfo: Subscription;
    public lastInfo: Info;
    public show: boolean;
    constructor (
        private _im: InfoMonitor,
        private ts: TranslatorService
    ) {}
    ngOnInit () {
        this._newInfo = this._im.onInfo$.subscribe(data => this
            .showInfo(data));
    }
    showInfo (data) {
        this.lastInfo = data;
        this.show = true;
        setTimeout(() => this.show = false, 7000);
    }
}