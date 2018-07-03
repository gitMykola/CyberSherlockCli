import {DT} from './DT';
import {Location} from './Location';

export class MarkerObject {
    public location: Location;
    public created: DT;
    public iconUrl: string;
    public iconUrlSelected: string;
    public iconUrlUnSelected: string;
    public local: boolean;
    public draggable: boolean;
    public opacity: number;
    public hidden: boolean;
    public description: string;
    constructor () {
        this.location = new Location();
        this.created = new DT((new Date()).getTime());
        this.local = true;
        this.draggable = true;
        this.hidden = false;
        this.opacity = 1;
        this.iconUrlSelected = '../../assets/img/icons/mapGPS/task_new_photo_active.png';
        this.iconUrlUnSelected = '../../assets/img/icons/mapGPS/task_new_photo_.png';
        this.iconUrl = this.iconUrlUnSelected;
        this.description = '';
    }
    public setLocation (data: Object) {
        if (this.draggable) {
            this.location.setLocation(data['lat'], data['lng']);
            return true;
        } else {
            return false;
        }
    }
    public setCreated (data: number = (new Date()).getTime()) {
        this.created = new DT(data);
    }
    public select () {
        this.iconUrl = this.iconUrlSelected;
    }
    public unSelect () {
        this.iconUrl = this.iconUrlUnSelected;
    }
}