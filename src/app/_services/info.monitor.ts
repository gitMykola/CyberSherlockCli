import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class InfoMonitor {
    private _info: any;
    public onInfo$ = new EventEmitter<{
        time: number;
        message: string;
        category: number; }>();
    constructor() {
        this._info = [];
    }
    add (msg: string, cat: number) {
        if (typeof msg === 'string'
            && msg.length
            && msg.length < 256
            && ( cat === 0 || cat === 1 || cat === 2 )// 0 - info, 1 - warning, 2 - error
        ) {
            const date = new Date(),
                message = {
                    time: date.getTime(),
                    message: msg,
                    category: cat
                };
            this._info.push(message);
            this.onInfo$.emit(message);
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
            if (filter.message && typeof filter.message === 'string' && filter.message.length < 256) {
                res = res.filter(msg => msg.message.match(new RegExp(filter.message, 'i')));
            }
            if (filter.category
                && ( filter.category === 0 || filter.category === 1 || filter.category === 2)) {
                res = res.filter(msg => msg.category === filter.category);
            }
        }
        return res;
    }
    getAll () {
        return this._info;
    }
}
