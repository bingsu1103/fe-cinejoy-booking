export {};

declare global {
  interface IBackendRes<T> {
    statusCode: number | string;
    error: string;
    message: object;
    data: T;
  }

  interface User {
    id?: string | number;
    username: string;
    email: string;
    password?: string;
    role: string;
    phone?: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    createdBy?: string;
    updatedBy?: string | null;
    refreshToken: string;
  }

  interface IFetchUserRes {
    id: number;
    username: string;
    email: string;
  }

  interface ILoginRes {
    accessToken: string;
    refreshToken: string;
    user: IFetchUserRes;
  }

  interface IRegisterRes {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Address {
    id: number;
    street_number: string;
    street_name: string;
    city: string;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
    theaters?: Theater[];
  }

  interface Theater {
    id: number;
    name: string;
    address?: Address;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
    auditoriums?: Auditorium[];
  }

  interface Auditorium {
    id: number;
    theater?: Theater;
    showTimes?: ShowTime[];
    seats?: Seat[];
    number: number;
    totalSeats: number;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
  }

  interface Film {
    id: number;
    name: string;
    duration: number;
    price: number;
    description: string;
    genre: string;
    language: string;
    release_date: string;
    rating: number;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
    showTime?: ShowTime[];
  }

  interface SeatVariant {
    id: number;
    seatType: string;
    basePrice: number;
    bonus: number;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
    seats?: Seat[];
  }

  interface Seat {
    id: number;
    auditorium?: Auditorium;
    seatVariant?: SeatVariant;
    seatRow: string;
    number: number;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
  }

  interface ShowTime {
    id: number;
    film?: Film;
    auditorium?: Auditorium;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
  }

  interface Booking {
    id: number;
    user?: User;
    status: string;
    total_price: number;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string;
    bookingItems?: BookingItem[];
    payments?: Payment[];
  }

  interface BookingItem {
    id: number;
    booking?: Booking;
    seat?: Seat;
    price: number;
  }

  interface Payment {
    id: number;
    booking?: Booking;
    seatHold?: SeatHold;
    method: string;
    status: string;
    createdAt: string;
    updatedAt: string | null;
  }

  interface SeatHold {
    id: number;
    seat?: Seat;
    showTime?: ShowTime;
    user?: User;
    expiresAt: string;
    createdAt: string;
    updatedAt: string | null;
  }

  interface ReqFilm {
    name: string;
    duration: number;
    price: number;
    description: string;
    genre: string;
    language: string;
    release_date: string | Date;
    rating: number;
  }
}
