
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Category {
    TWO_WHEELER = "TWO_WHEELER",
    FOUR_WHEELER = "FOUR_WHEELER"
}

export class CreateBookingInput {
    firstName: string;
    lastName: string;
    vehicleId: string;
    startDate: Date;
    endDate: Date;
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
}

export class UpdateUserInput {
    id: string;
    firstName: string;
    lastName: string;
}

export class UpdateVehicleInput {
    id: string;
    name?: Nullable<string>;
    isAvailable?: Nullable<string>;
}

export class Booking {
    id?: Nullable<string>;
    user?: Nullable<User>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    vehicle?: Nullable<Vehicle>;
}

export abstract class IQuery {
    abstract booking(id: string): Nullable<Booking> | Promise<Nullable<Booking>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract vehicleTypesByCategory(category: Category): Nullable<VehicleType>[] | Promise<Nullable<VehicleType>[]>;

    abstract vehicleByType(vehicleTypeId: string): Nullable<Vehicle>[] | Promise<Nullable<Vehicle>[]>;
}

export abstract class IMutation {
    abstract createBooking(createBookingInput: CreateBookingInput): Booking | Promise<Booking>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract updateVehicle(updateVehicleInput: UpdateVehicleInput): Vehicle | Promise<Vehicle>;
}

export class User {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class VehicleType {
    id?: Nullable<string>;
    name?: Nullable<string>;
    category?: Nullable<Category>;
}

export class Vehicle {
    id?: Nullable<string>;
    name?: Nullable<string>;
    isAvailable?: Nullable<string>;
    VehicleType?: Nullable<VehicleType>;
    vehicleTypeId?: Nullable<string>;
}

type Nullable<T> = T | null;
