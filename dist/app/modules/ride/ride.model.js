"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const rideHistorySchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: Object.values(ride_interface_1.RideStatus)
    },
    changedAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { _id: false });
const rideSchema = new mongoose_1.Schema({
    rider: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
    pickupLocation: { type: String, required: true },
    destinationLocation: { type: String, required: true },
    status: { type: String, enum: Object.values(ride_interface_1.RideStatus), default: ride_interface_1.RideStatus.REQUESTED },
    fare: { type: Number, required: true, default: 0 },
    acceptedAt: Date,
    pickedUpAt: Date,
    completedAt: Date,
    cancelledAt: Date,
    rideHistory: { type: [rideHistorySchema], default: [] },
}, {
    timestamps: true,
    versionKey: false
});
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
