import {Component, EventEmitter, Output} from '@angular/core';
import {InfoMonitor, TranslatorService, UserService} from '../_services';
import {config} from '../config';

@Component({
    selector: 'app-dash',
    template: `
        <div class="dash-board" id="dash-board">
            <div class="dash-block">
                <span *ngFor="let action of actions">
                    <button class="dash-item"
                            *ngIf="!action.auth || user.auth"
                            title="{{ts.translate('actions.' + action.action)}}"
                            (click)="onAct(action.action)">
                    <span class="material-icons">{{action.icon}}</span>
                    <span>{{ts.translate('actions.' + action.action)}}</span>
                </button>
                </span>
            </div>
            <div class="dash-block">
                <span *ngFor="let category of categories; index as i">
                    <button class="dash-item {{+ category.selected ? 'active' : ''}}"
                            *ngIf="!category.auth || user.auth"
                            title="{{ts.translate('labels.' + category.name)}}"
                            (click)="selectCategory(i)">
                    <span class="material-icons">{{category.icon}}</span>
                    <span title="{{ts.translate('labels.' + category.name)}}">
                        {{ts.translate('labels.' + category.name)}}</span>
                </button>
                </span>
            </div>
        </div>
    `
})
export class DashBoardComponent {
    public actions: any;
    public categories: any;
    @Output() onAction = new EventEmitter<string>();
    constructor (
        public ts: TranslatorService,
        public user: UserService,
        private _im: InfoMonitor
    ) {
        this.actions = config().app.dash.actions;
        this.categories = config().app.dash.categories;
    }
    onAct (act: string) {
        this.onAction.emit(act);
    }
    selectCategory (i: number) {
        this.categories[i].selected = !this.categories[i].selected;
        this._im.add(this.ts
            .translate('labels.' + this.categories[i].name), 0);
    }
}
