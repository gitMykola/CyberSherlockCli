export class Task {
    public id: string;
    public location: {
        lat: number,
        lang: number
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
        lang: number
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