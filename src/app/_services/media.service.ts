import {Injectable} from '@angular/core';
import {Media} from '../lib/classes';
import {UserService} from './user.service';
import axios from 'axios';
import {config} from '../config';
import {InfoMonitor} from './info.monitor';
import {ActionMonitor} from "./action.monitor";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class MediaService {
    private _config: any;
    public action: Subscription;
    public medias: Media[];
    public static verifyData (data) {
        return new Promise((resolve, reject) => {
            try {
                if (typeof data !== 'object') {
                    reject('object');
                } else {
                    const d = {
                            id: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            user: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            location: (value) => {
                                return typeof (value) === 'object'
                                    && ((Math.abs(value.lat) <= 90 && Math.abs(value.lng) <= 180)
                                  || (typeof value.type === 'string'
                                    && (Math.abs(value.coordinates[1]) <= 90
                                      && Math.abs(value.coordinates[0]) <= 180)
                                  ));
                            },
                            filter: (value) => {
                              return value.type === 'Poligon'
                                && typeof (value.coordinates) === 'object'
                                && typeof (value.coordinates[0][0][0]) === 'number'
                                && typeof (value.coordinates[0][0][1]) === 'number'
                                && typeof (value.coordinates[0][1][0]) === 'number'
                                && typeof (value.coordinates[0][1][1]) === 'number'
                                && typeof (value.coordinates[0][2][0]) === 'number'
                                && typeof (value.coordinates[0][2][1]) === 'number'
                                && typeof (value.coordinates[0][3][0]) === 'number'
                                && typeof (value.coordinates[0][3][1]) === 'number';
                            },
                            draggable: (value) => {
                                return typeof (value) === 'boolean';
                            },
                            type: (value) => {
                                return typeof (value) === 'number' && [0, 1, 2, 3, 4, 5].indexOf(value) >= 0;
                            },
                            category: (value) => {
                                return typeof (value) === 'number' && [0, 1, 2, 3, 4, 5].indexOf(value) >= 0;
                            },
                            deviceType: (value) => {
                                return typeof (value) === 'number' && [0, 1].indexOf(value) >= 0;
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
                            },
                            showComponent: (value) => {
                                return typeof (value) === 'boolean';
                            },
                            filename: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            sha3: (value) => {
                                return typeof (value) === 'string' && value.length < 256;
                            },
                            created: (value) => {
                                return typeof (value) === 'number' && value > 0;
                            },
                            direction: (value) => {
                                return typeof (value) === 'object'
                                    && typeof (value.horizont) === 'number'
                                    && typeof (value.vertical) === 'number';
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
        private userService: UserService,
        private im: InfoMonitor,
        private am: ActionMonitor
    ) {
        this.medias = [];
        this._config = config();
        this.action = this.am.onAction$.subscribe(data => {
            if (data['category'] === 'media') {
                this.im.add('Media action: ' + data['action'], 0);
            }
        });
    }
    getMedia () {}
    async add (data: any) {
            try {
                await MediaService.verifyData(data);
                this.medias.push(
                    new Media(data)
                );
                return true;
            } catch (e) {
                this.im.add(e.message, 0);
                return false;
            }
    }
    async edit () {
      return true;
    }
    async getMediaByFilter (filter: any) {}
    getSelectedMedia () {
      return this.medias.filter(media => media.selected)[0];
    }
    select(index: number = 0) {
      this.medias.map((media, ind) => {
        media.selected = (ind === index);
      });
    }
    sendMediaToServer(media: Media) {
        return new Promise((resolve, reject) => {
            try {
                    const data = {
                        user: this.userService.user.id,
                        location: {
                          type: 'Point',
                          coordinates: [
                            media.location.getLocation().lng,
                            media.location.getLocation().lat
                          ]
                        },
                        category: media.type,
                        created: media.created.getTime(),
                        filename: media.filename,
                        sha3: media.sha3,
                        url: media.url,
                        cost: media.cost,
                        deviceType: media.deviceType,
                        direction: media.direction
                    };
                MediaService.verifyData(data)
                    .then(() => {console.dir(data);
                        return this._ax('media_auth_create',
                            [JSON.stringify(data)]);
                    })
                    .then((res: any) => {
                        if (!res) {
                            return reject(false);
                        } else {
                            media.id = res.id;
                            return resolve(media);
                        }
                    })
                    .catch(e => {
                        return reject(e);
                    });
            } catch (error) {
                return reject(error);
            }
        });
    }
    async filter (filter) {console.dir(filter);
      await MediaService.verifyData(filter);
      return await this._ax('media_auth_get_by_filter',
        [JSON.stringify(filter)]);
    }
    async find() {
      return true;
    }
    private _ax (method: string, params: any) {
        return new Promise( (resolve, reject) => {
            try {
                axios.post(this._config.app.url_server, {
                    jsonrpc: '2.0',
                    method: method,
                    params: params,
                    id: this.userService.user.id
                }, {
                    headers: {
                    'a-token': this.userService.user.token
                }})
                    .then((response: any) => {
                        if (response.data
                            && response.data.id === this.userService.user.id) {
                            return resolve(response.data.result);
                        } else {
                            return reject(response && response.error && response.error.message);
                        }
                    })
                    .catch(err => {
                        return reject(err);
                    });
            } catch (e) {
                return reject(e);
            }
        });
    }
}
