import {Device} from './Device';

export class People {
    public location: {
        lat: number,
        lng: number
    };
    public type: number;
    devices: Device[];
    public comments: string;
    public state: number;
    public priceFloor: number;
    public show: boolean;
    constructor() {}
    public select() {}
    public unSelect() {}
}
