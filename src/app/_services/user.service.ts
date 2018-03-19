import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {config} from '../config';
import axios from 'axios';

@Injectable()
export class UserService {
    public user: {
        auth: boolean,
        id: string,
        email: string,
        phone: string
    };
    private _config: any;
    private _axios: any;
    constructor (
    ) {
        this._userSet();
        this.user.auth = false;
        this._config = config();
        this._axios = axios;
    }
    private _userSet(data?: any) {
        this.user = {
            id: data && data.id || '',
            email: data && data.email || '',
            phone: data && data.phone || '',
            auth: false
        };
        return true;
    }
    public userLogout () {
        return this.user.auth ? this._userSet() : false;
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
            try {
                const params = [];
                params.push(data.passphrase);
                params.push(data.email);
                params.push(data.phone);
                axios('user_create_local', params)
                    .then(response => {
                        if (response['result'].user) {
                            this._userSet(response['result'].user);
                            this.user.auth = true;
                            return resolve(true);
                        } else {
                            return reject('User service error.');
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
    public loginLocalUser (data: any) {
        return new Promise((resolve, reject) => {
            try {
                const params = [];
                const rpc_method = data.email && data.email.length > 0 ?
                    'auth_local_email' : 'auth_local_phone';
                params.push(data.passphrase);
                params.push(rpc_method === 'auth_local_email' ? data.email : data.phone);
                this._ax(rpc_method, params)
                    .then(response => {
                        if (response['result'].user) {
                            this._userSet(response['result'].user);
                            this.user.auth = true;
                            return resolve(true);
                        } else {
                            return reject('User service error.');
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
    private _ax (method: string, params: any) {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'post',
                url: this._config.app.url_server,
                data: {
                    jsonrpc: '2.0',
                    method: method,
                    params: params,
                    id: 144
                }
            })
                .then(response => {
                    if (response.data) {
                        return resolve(response.data);
                    } else {
                        return reject('User service error.');
                    }
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }
}
