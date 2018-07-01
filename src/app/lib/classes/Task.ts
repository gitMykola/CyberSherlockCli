import {Location} from './Location';

export class Task {
    public id: string;
    public location: Location;
    public type: number;
    public description: string;
    public cost: number;
    public owner: string;
    public state: number;
    public created: number;
    public show: boolean;
    constructor() {
        this.location = new Location();
        this.location.setLocation();
    }
}





