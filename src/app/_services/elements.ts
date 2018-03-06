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
}
export class Media {
    public id: string;
    public location: {
        lat: number,
        lng: number
    };
    public url: number;
    public hash: string;
    public cost: number;
    public owner: string;
    public neuro: string[];
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

