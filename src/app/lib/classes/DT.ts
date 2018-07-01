export class DT {
    public static toDateHumanString (timestamp: number) {
        const d = new Date(timestamp * 1000);
        return ((d.getDate() < 10) ? '0' : '') + d.getDate() + '.'
            + ((d.getMonth() + 1 < 10) ? '0' : '') + (d.getMonth() + 1) + '.'
            + d.getFullYear();
    }
    public static toTimeHumanString (timestamp: number) {
        const t = new Date(timestamp * 1000);
        return ((t.getHours() < 10) ? '0' : '') + t.getHours() + ':'
            + ((t.getMinutes() < 10) ? '0' : '') + t.getMinutes() + ':'
            + ((t.getSeconds() < 10) ? '0' : '') + t.getSeconds();
    }
}