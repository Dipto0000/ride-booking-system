import { Types } from "mongoose";


export enum Role {
    ADMIN = "Admin",
    RIDER = "Rider",
    DRIVER = "Driver"
}

export enum AccountStatus {
    ACTIVE = "Active",
    BLOCKED = "Blocked"
}

export enum DriverStatus {
    PENDING = "Pending",   
    APPROVED = "Approved", 
    SUSPENDED = "Suspended" 
}

export interface IDriverDetails {
    availability: "online" | "offline";
    totalEarnings : number;
    
}

export interface IEmergencyContact {
    name: string;
    phone: string;
}

export interface IUser {
    _id?: Types.ObjectId
    name: string;
    email: string;
    password?: string;
    role: Role;
    accountStatus?: AccountStatus;
    driverStatus?: DriverStatus;
    driverDetails?: IDriverDetails;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    emergencyContacts?: IEmergencyContact[];
}