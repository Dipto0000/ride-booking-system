import { Types } from "mongoose";

export enum RideStatus {
   REQUESTED = "requested",
   ACCEPTED = "accepted",
   PICKED_UP = "picked_up",
   IN_TRANSIT = "in_transit",
   COMPLETED = "completed",
   CANCELLED = "cancelled",
}

export interface IRideHistory {
    status: RideStatus;
    changedAt: Date;
    updatedBy?: Types.ObjectId;
}


export interface IRide {
    rider : Types.ObjectId;
    driver?: Types.ObjectId | null;
    pickupLocation: String;
    destinationLocation: String;
    status?: RideStatus;
    fare: number;

    acceptedAt?: Date;
    pickedUpAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
    inTransitAt?: Date;
    rideHistory?: IRideHistory[]
}

