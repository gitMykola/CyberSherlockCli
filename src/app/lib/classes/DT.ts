export class DT extends Date {
    constructor(data) {
        super(data);
    }
    public toDateHumanString () {
        return ((this.getDate() < 10) ? '0' : '') + this.getDate() + '.'
            + ((this.getMonth() + 1 < 10) ? '0' : '') + (this.getMonth() + 1) + '.'
            + this.getFullYear();
    }
    public toTimeHumanString () {
        return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':'
            + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':'
            + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
    }
}