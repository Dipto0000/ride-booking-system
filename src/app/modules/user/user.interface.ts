import { Types } from "mongoose";


export enum Role {
    ADMIN = "Admin",
    RIDER = "Rider",
    DRIVER = "Driver"
}

export enum IsActive {
    ACTIVE = "Active",
    BLOCKED = "Blocked",
    SUSPENDED = "Suspended"
}

export interface IDriverDetails {
    availability: "online" | "offline";
    totalEarnings : number;
    
}
export interface IUser {
    _id?: Types.ObjectId
    name: string;
    email: string;
    password: string;
    role: Role;
    isActive?: IsActive;
    driverDetails?: IDriverDetails
}