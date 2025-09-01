"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideServices = void 0;
const user_model_1 = require("../user/user.model");
const ride_interface_1 = require("./ride.interface");
const ride_model_1 = require("./ride.model");
const user_interface_1 = require("../user/user.interface");
const createRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { riderName, pickupLocation, destinationLocation } = payload, rest = __rest(payload, ["riderName", "pickupLocation", "destinationLocation"]);
    const rider = yield user_model_1.User.findOne({ name: riderName });
    const riderID = rider === null || rider === void 0 ? void 0 : rider._id;
    if (!rider) {
        throw new Error("Rider does not exist");
    }
    const ride = yield ride_model_1.Ride.create(Object.assign({ rider: riderID, pickupLocation,
        destinationLocation }, rest));
    return ride;
});
const getAllRide = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRide = yield ride_model_1.Ride.find();
    return allRide;
});
const getRideHistory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield ride_model_1.Ride.find({ rider: payload });
    return history;
});
const cancelRide = (id, riderId) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    if (riderId.role === user_interface_1.Role.RIDER) {
        query = { _id: id, rider: riderId.userId };
    }
    else if (riderId.role === user_interface_1.Role.ADMIN) {
        query = { _id: id };
    }
    else {
        throw new Error("You are not authorized to cancel this ride");
    }
    const ride = yield ride_model_1.Ride.findOne(query);
    if (!ride) {
        throw new Error("Ride does not exist or you are not the rider");
    }
    if (ride.status !== ride_interface_1.RideStatus.REQUESTED) {
        throw new Error("Ride cannot be canceled as driver has accepted the ride already.");
    }
    ride.status = ride_interface_1.RideStatus.CANCELLED;
    yield ride.save();
    return ride;
});
const driverAcceptRide = (rideId, driver) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new Error("Ride does not exist");
    }
    if (ride.status !== ride_interface_1.RideStatus.REQUESTED) {
        throw new Error("Ride already accepted or cancelled.");
    }
    ride.status = ride_interface_1.RideStatus.ACCEPTED;
    ride.driver = driver.userId;
    ride.acceptedAt = new Date();
    (_a = ride.rideHistory) === null || _a === void 0 ? void 0 : _a.push({ status: ride_interface_1.RideStatus.ACCEPTED, changedAt: new Date() });
    yield ride.save();
    return ride;
});
const driverRejectRide = (rideId, driver) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new Error("Ride does not exist");
    }
    if (ride.status !== ride_interface_1.RideStatus.REQUESTED) {
        throw new Error("Ride cannot be rejected now.");
    }
    ride.status = ride_interface_1.RideStatus.CANCELLED;
    ride.cancelledAt = new Date();
    (_a = ride.rideHistory) === null || _a === void 0 ? void 0 : _a.push({ status: ride_interface_1.RideStatus.CANCELLED, changedAt: new Date() });
    yield ride.save();
    return ride;
});
const driverUpdateRideStatus = (rideId, driver, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const ride = yield ride_model_1.Ride.findOne({ _id: rideId, driver: driver.userId });
    if (!ride) {
        throw new Error("Ride does not exist or not assigned to you");
    }
    switch (status) {
        case ride_interface_1.RideStatus.PICKED_UP:
            ride.status = ride_interface_1.RideStatus.PICKED_UP;
            ride.pickedUpAt = new Date();
            (_a = ride.rideHistory) === null || _a === void 0 ? void 0 : _a.push({ status: ride_interface_1.RideStatus.PICKED_UP, changedAt: new Date() });
            break;
        case ride_interface_1.RideStatus.IN_TRANSIT:
            ride.status = ride_interface_1.RideStatus.IN_TRANSIT;
            ride.inTransitAt = new Date();
            (_b = ride.rideHistory) === null || _b === void 0 ? void 0 : _b.push({ status: ride_interface_1.RideStatus.IN_TRANSIT, changedAt: new Date() });
            break;
        case ride_interface_1.RideStatus.COMPLETED:
            ride.status = ride_interface_1.RideStatus.COMPLETED;
            ride.completedAt = new Date();
            yield user_model_1.User.findByIdAndUpdate(driver.userId, {
                $inc: { "driverDetails.totalEarning": ride.fare }
            });
            (_c = ride.rideHistory) === null || _c === void 0 ? void 0 : _c.push({ status: ride_interface_1.RideStatus.COMPLETED, changedAt: new Date() });
            break;
        default:
            throw new Error("Invalid status");
    }
    yield ride.save();
    return ride;
});
const driverTotalEarning = (driver) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById(driver.userId);
    if (!user || user.role !== user_interface_1.Role.DRIVER) {
        throw new Error("You are not a driver");
    }
    return {
        totalEarning: ((_a = user.driverDetails) === null || _a === void 0 ? void 0 : _a.totalEarnings) || 0
    };
});
const setAvailability = (driver, availability) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(driver.userId);
    if (!user || user.role !== user_interface_1.Role.DRIVER) {
        throw new Error("You are not a driver");
    }
    user.driverDetails = user.driverDetails || { availability: "offline", totalEarnings: 0 };
    user.driverDetails.availability = availability;
    yield user.save();
    return user;
});
exports.RideServices = {
    createRide,
    getAllRide,
    getRideHistory,
    cancelRide,
    driverAcceptRide,
    driverRejectRide,
    driverUpdateRideStatus,
    driverTotalEarning,
    setAvailability,
};
