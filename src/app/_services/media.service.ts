import {Injectable} from '@angular/core';
import {Media} from './elements';
import {UserService} from './user.service';

@Injectable()
export class MediaService {
    public medias: Media[];
    private static _verifyData (data) {
        return new Promise((resolve, reject) => {
            try {
                if (typeof data !== 'object') {
                    reject('object');
                } else {
                    const d = {
                            id: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            location: (value) => {
                                return typeof (value) === 'object'
                                    && Math.abs(value.lat) <= 180 && Math.abs(value.lng) <= 180;
                            },
                            draggable: (value) => {
                                return typeof (value) === 'boolean';
                            },
                            type: (value) => {
                                return typeof (value) === 'number' && [0, 1, 2, 3, 4, 5].indexOf(value) > 0;
                            },
                            iconUrl: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            url: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            hash: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            cost: (value) => {
                                return typeof (value) === 'number';
                            },
                            owner: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            neuro: (value) => {
                                return typeof (value) === 'object' && value.length < 256;
                            },
                            label: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            opacity: (value) => {
                                return typeof (value) === 'number' && [0, 1].indexOf(value) > 0;
                            },
                            local: (value) => {
                                return typeof (value) === 'boolean';
                            }
                        },
                        keys = Object.keys(data);
                    for (let i = 0; i < keys.length; i++) {
                        if (!d[keys[i]] || !d[keys[i]](data[keys[i]])) {
                            reject(keys[i]);
                        }
                    }
                    resolve();
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    constructor (
        private user: UserService
    ) {
        this.medias = [];
    }
    getMedia () {}
    addMedia (data: any) {
        return new Promise( (resolve, reject) => {
            try {
                MediaService._verifyData(data)
                    .then(() => {
                        const newMedia = Object.assign(new Media(), data);
                        this.medias.push(newMedia);
                        resolve();
                    })
                    .catch(e => {
                        reject(e);
                    });
            } catch (e) {
                reject(e);
            }
        });
    }
    getByFilter () {}
}
