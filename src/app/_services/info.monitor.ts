import { Injectable, EventEmitter } from '@angular/core';
import {Info} from './elements';

@Injectable()
export class InfoMonitor {
    private _info: Info[];
    public onInfo$ = new EventEmitter<Info>();
    constructor() {
    }
    add (msg: string, type: number) {
        if (typeof msg === 'string'
            && msg.length
            && msg.length < 256
            && ( type === 0 || type === 1 || type === 2 )// 0 - info, 1 - warning, 2 - error
        ) {
            const date = new Date(),
                info = new Info();
            info.info = msg;
            info.type = type;
            info.time = date.getTime();
            this._info.push(info);
            if (this._info.length > 100) {
                this._info.shift();
            }
            this.onInfo$.emit(info);
        }
    }
    get (filter: any): any {
        let res = this._info;
        if (!filter) {
            return [];
        } else {
            if (filter.time) {
                if (typeof filter.time === 'number') {
                    res = res.filter(msg => msg.time === filter.time);
                } else if (filter.time[0] && filter.time[1]) {
                    res = res.filter(msg => msg.time <= filter.time[0] && msg.time >= filter.time[1]);
                }
            }
            if (filter.msg && typeof filter.msg === 'string' && filter.msg.length < 256) {
                res = res.filter(msg => msg.info.match(new RegExp(filter.msg, 'i')));
            }
            if (filter.type
                && ( filter.type === 0 || filter.type === 1 || filter.type === 2)) {
                res = res.filter(msg => msg.type === filter.type);
            }
        }
        return res;
    }
    getAll () {
        return this._info;
    }
}
