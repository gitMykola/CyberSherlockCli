export class Location {
    private lat: number;
    private lng: number;
    private type: number; // 0 - by GPS device, 1 - manual correction, 2 - manual
    public setLocation(lat: number = 0, lng: number = 0) {
        this.lat = lat;
        this.lng = lng;
    }
    public getLocation() {
        return {
            lat: this.lat,
            lng: this.lng
        };
    }
    public setType(type: number = 2) {
        this.type = type;
    }
    public getType() {
        return this.type;
    }
}





