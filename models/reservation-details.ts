import User from "./user";

export default class ReservationDetails {
    hotelName: string;
    checkInDate: number;
    checkOutDate: number;
    adults: number;
    children: number;
    rooms: number;
    user: User;

    constructor(hotelName: string, checkInDate: number, checkOutDate: number, adults: number, children: number, rooms: number, user: User) {
        this.hotelName = hotelName;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.adults = adults;
        this.children = children;
        this.rooms = rooms;
        this.user = user;
    }
}