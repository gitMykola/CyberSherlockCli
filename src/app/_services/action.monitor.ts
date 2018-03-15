import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ActionMonitor {
    public onAction$ = new EventEmitter<{ action: string }>();
    constructor () {}
}