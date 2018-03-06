import {Injectable} from '@angular/core';
import {Media} from './elements';
import {UserService} from './user.service';

@Injectable()
export class MediaService {
    private medias: Media[];
    constructor (
        private user: UserService
    ) {}
    getMedia () {}
    addMedia () {}
    getByFilter () {}
}
