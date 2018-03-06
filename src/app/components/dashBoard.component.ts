import {Component, EventEmitter, Output} from '@angular/core';
import {TranslatorService, UserService} from '../_services';
import {config} from '../config';

@Component({
    selector: 'app-dash',
    template: `
        <div class="" id="dash-board">
            <span *ngFor="let block of buttons">
                <div class="dash-block" *ngIf="!block.auth || user.auth">
                    <h5 class="header" title="{{ts.translate('labels.' + block.name)}}">
                        {{ts.translate('labels.' + block.name)}}</h5>
                    <div class="button-block">
                        <span *ngFor="let action of block.actions">
                            <button *ngIf="!action.auth || user.auth"
                                    title="{{ts.translate('actions.' + action.action)}}"
                                    (click)="onAct(action.action)">
                                <span class="material-icons">{{action.icon}}</span>
                                <span>{{ts.translate('actions.' + action.action)}}</span>
                            </button>
                        </span>
                    </div>
                </div>
            </span>
        </div>
    `
})
export class DashBoardComponent {
    public buttons: any;
    @Output() onAction = new EventEmitter<string>();
    constructor (
        public ts: TranslatorService,
        public user: UserService
    ) {
        this.buttons = config().app.dash;
    }
    onAct (act: string) {
        this.onAction.emit(act);
    }
}
