import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {InfoMonitor, TranslatorService} from '../_services';
import {Info, DT} from '../_services/elements';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {anim} from './animations';
import * as $ from 'jquery';

@Component ({
    selector: 'app-lastinfo',
    template: `
        <div id="last-info" [@last]="show"
             class="col-sm-6 offset-sm-3 paragraph-{{ + lastInfo.type === 1 ? 'warning'
             : lastInfo.type === 2 ? 'error' : 'info'}}">
            <h6>{{ts.translate(lastInfo.type === 0 ? 'labels.message' :
            lastInfo.type === 1 ? 'labels.warning' : 'labels.error')}}</h6>
            <p>{{lastInfo.info}}</p></div>
    `,
    styles: [`
        #last-info {
            display: block;
            position: fixed;
            left: 0;
            padding: 0;
            opacity: 0;
        }
        #last-info p {
            font-size: 25px;
        }
    `],
    animations: [
        trigger('last', [
            state('false', style({opacity: 0})),
            state('true', style({opacity: 1})),
            transition('false => true', animate(500)),
            transition('true => false', animate(500))
        ])
    ]
})
export class LastInfoComponent implements OnInit, OnDestroy, AfterViewChecked {
    private _newInfo: Subscription;
    private timer: any;
    public lastInfo: Info;
    public show: boolean;
    constructor (
        public im: InfoMonitor,
        public ts: TranslatorService
    ) {
        this.lastInfo = new Info();
    }
    ngOnInit () {
        this._newInfo = this.im.onInfo$.subscribe(data => this
            .showInfo(data));
    }
    ngOnDestroy () {
        if (this._newInfo) {
            this.im.onInfo$.unsubscribe();
        }
    }
    showInfo (data) {
        this.lastInfo = data;
        this.show = true;
        this.timer = null;
        this.timer = setTimeout(() => this.show = false, 7000);
    }
    ngAfterViewChecked () {
        const lastInfoDom = document.querySelector('#last-info');
        const h = window.innerHeight - (lastInfoDom.clientHeight + 10);
        if ($(lastInfoDom).css('top') !== h) {
            $(lastInfoDom).css('top', h + 'px');
        }
    }
}
