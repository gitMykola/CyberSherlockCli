export class Task {
    public id: string;
    public location: {
        lat: number,
        lng: number
    };
    public type: number;
    public description: string;
    public cost: number;
    public owner: string;
    public state: number;
    public created: number;
    public show: boolean;
}
export class Media {
    public id: string;
    public location: {
        lat: number,
        lng: number,
        type: number // 0 - by GPS device, 1 - manual correction, 2 - manual
    };
    public type: number; // 0-photo, 1-video, 3-audio
    public txid: string; // location + timestamp + hash
    public url: number;
    public cost: number;
    public owner: string;
    public deviceType: number; // 0 - local, 1 - remote(ip-webcam)
    public direction: {
        horizont: number,
        vertical: number
    };
    public description: string;
    public neuro: Array<string>;
    public iconUrl: string;
    public local: boolean;
    public draggable: boolean;
    public opacity: number;
}
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
}
export class Device {
    type: string;
    brand: string;
    model: string;
    resolution: number;
    description: string;
}
export class Info {
    public type: number;
    public info: string;
    public time: number;
}
export class DT {
    public static toDate (timestamp: number) {
        const d = new Date(timestamp * 1000);
        return ((d.getDate() < 10) ? '0' : '') + d.getDate() + '.'
            + ((d.getMonth() + 1 < 10) ? '0' : '') + (d.getMonth() + 1) + '.'
            + d.getFullYear();
    }
    public static toTime (timestamp: number) {
        const t = new Date(timestamp * 1000);
        return ((t.getHours() < 10) ? '0' : '') + t.getHours() + ':'
            + ((t.getMinutes() < 10) ? '0' : '') + t.getMinutes() + ':'
            + ((t.getSeconds() < 10) ? '0' : '') + t.getSeconds();
    }
}

