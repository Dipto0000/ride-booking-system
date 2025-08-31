import { model, Schema } from "mongoose";
import { IRide, IRideHistory,RideStatus } from "./ride.interface";


const rideHistorySchema = new Schema<IRideHistory>({
    status: {
        type: String,
        enum: Object.values(RideStatus)
    },
    changedAt: {type: Date, default: Date.now},
    updatedBy: {type: Schema.Types.ObjectId, ref: "User"},
}
, {_id: false}
)
const rideSchema = new Schema<IRide>({

    rider: {type: Schema.Types.ObjectId, ref: "User", required: true},
    driver: {type: Schema.Types.ObjectId, ref: "User", default: null},
    pickupLocation: {type: String, required: true},
    destinationLocation: {type: String, required: true},
    status: {type: String, enum: Object.values(RideStatus), default: RideStatus.REQUESTED},
    fare: {type: Number, required: true, default: 0},
    acceptedAt: Date,
    pickedUpAt: Date,
    completedAt: Date,
    cancelledAt: Date,

    rideHistory: {type: [rideHistorySchema], default: []},
},{
    timestamps: true,
    versionKey: false
})

export const Ride = model<IRide>("Ride", rideSchema)