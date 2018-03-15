import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {config} from '../config';
import {Jsonp} from '@angular/http';
import axios from 'axios';

@Injectable()
export class UserService {
    public auth: boolean;
    private _config: any;
    constructor (
        private http: HttpClient
    ) {
        this.auth = false;
        this._config = config().app.google;
    }
    public authen (act: string) {
        this.auth = act === 'enter';
    }
    public gAuth () {
        /*ax({
            method: 'post',
            url: 'http://localhost:3080',
            data: {
                jsonrpc: '2.0',
                method: 'auth_local_email',
                params: ['12345678', 'mykola_borodyn@ecoengineer.in.ua'],
                id: 144
            }
        })
            .then(res => console.dir(res))
            .catch(err => console.dir(err));*/
        axios({
            method: 'get',
            // url: 'https://accounts.google.com/o/oauth2/v2/auth',
            url: 'https://google.com',
            params: {
                client_id: this._config.clientId,
                scope: 'profile'
            },
            withCredentials: true
        });
    }
    public createLocalUser (data: any) {
        return new Promise((resolve, reject) => {
            const params = [];
            params.push(data.passphrase);
            params.push(data.email);
            params.push(data.phone);
             console.dir(params);
            try {
                axios({
                    method: 'post',
                    url: 'http://localhost:3080',
                    data: {
                        jsonrpc: '2.0',
                        method: 'user_create_local',
                        params: params,
                        id: 144
                    }
                })
                    .then(response => {
                    return resolve(response);
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
