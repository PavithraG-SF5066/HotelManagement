export const foodType: string[] = ["Veg", "Non-Veg"];
export const gender: string[] = ["Male", "Female", "Others"];
export const roomType: string[] = ["Standard", "Delux", "Suit"];
export const bookingStatus: string[] = ["Initiated", "Booked", "Cancelled"];

export interface Users {
    userID: number;
    name: string;
    userPhoneNumber: string;
    aadharNumber: string;
    address: string;
    foodType: string;
    gender: string;
    email: string;
    password: string;
    amount: number;
}

export interface RoomDetails {
    roomID: number;
    roomType: string;
    numberOfBeds: number;
    pricePerDay: number;
}
export interface RoomSelection {
    selectionID: number;
    wishListID: number;
    bookingID: number;
    roomID: number;
    stayingDateFrom: Date;
    stayingDateTo: Date;
    price: number;
    numberOfDays: number;
    bookingStatus: string;
}
export interface BookingDetails {
    bookingID: number;
    userID: number;
    totalPrice: number;
    dateOfBooking: Date;
    bookingStatus: string;
}
export interface WishList {
    wishListID: number;
    userID: number;
    roomID: number;
    priceOfRoom: number;
    fromDate: Date;
    toDate: Date;
}