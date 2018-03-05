import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
    public auth: boolean;
    constructor () {
        this.auth = false;
    }
    public authen (act: string) {
        this.auth = act === 'enter';
    }
}
