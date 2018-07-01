import {Src} from './Src';
import {Location} from './Location';

export class Media {
    public id: string;
    public location: Location;
    public type: number; // 0-photo, 1-video, 2-audio
    public created: number; // Unix timestamp
    public txid: string; // hash
    public filename: string; // timestamp + 'LAT' + value + 'LNG' + value + '.' + extention
    public sha3: string;
    public url: string;
    public sources: Src[];
    public cost: number;
    public close: boolean;
    public owner: string;
    public deviceType: number; // 0 - local, 1 - remote(ip-webcam)
    public direction: {
        horizont: number,
        vertical: number
    };
    public description: string;
    public neuro: string[];
    public iconUrl: string;
    public iconUrlSelected: string;
    public iconUrlUnSelected: string;
    public local: boolean;
    public draggable: boolean;
    public opacity: number;
    public showComponent: boolean;
    constructor () {
        this.location = new Location();
        this.location.setLocation();
        this.showComponent = false;
        this.local = true;
        this.draggable = true;
        this.type = 0;
        this.opacity = 1;
        this.iconUrlSelected = '../../assets/img/icons/mapGPS/task_new_photo_active.png';
        this.iconUrlUnSelected = '../../assets/img/icons/mapGPS/task_new_photo_.png';
        this.iconUrl = this.iconUrlUnSelected;
        this.url = '';
        this.sources.push(new Src());
        this.cost = 0;
        this.deviceType = 0;
        this.direction = {
            horizont: 0,
            vertical: 0
        };
    }
    public setCoords (coords: Object) {
        if (this.draggable) {
            this.location.setLocation(coords['lat'], coords['lng']);
            return true;
        } else {
            return false;
        }
    }
    public select () {
        this.iconUrl = this.iconUrlSelected;
    }
    public unSelect () {
        this.iconUrl = this.iconUrlUnSelected;
    }
}