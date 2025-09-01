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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const ride_service_1 = require("./ride.service");
const sendResponse_1 = require("../../utils/sendResponse");
const rideRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createRide = yield ride_service_1.RideServices.createRide(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Ride created successfully",
        data: createRide,
    });
}));
const getAllRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allRide = yield ride_service_1.RideServices.getAllRide();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Rides retreived successfully",
        data: allRide,
    });
}));
const getRideHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const riderID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const rideHistory = yield ride_service_1.RideServices.getRideHistory(riderID);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride history retreived successfully",
        data: rideHistory,
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rider = req.user;
    const cancelRide = yield ride_service_1.RideServices.cancelRide(id, rider);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride cancelled successfully",
        data: cancelRide,
    });
}));
const driverAcceptRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const driver = req.user;
    const acceptRide = yield ride_service_1.RideServices.driverAcceptRide(id, driver);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride accepted successfully",
        data: acceptRide,
    });
}));
const driverRejectRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const driver = req.user;
    const rejectRide = yield ride_service_1.RideServices.driverRejectRide(id, driver);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride rejected successfully",
        data: rejectRide,
    });
}));
const driverUpdateRideStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const driver = req.user;
    const { status } = req.body;
    const updateRideStatus = yield ride_service_1.RideServices.driverUpdateRideStatus(id, driver, status);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride status updated successfully",
        data: updateRideStatus,
    });
}));
const driverTotalEarning = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = req.user;
    const totalEarning = yield ride_service_1.RideServices.driverTotalEarning(driver);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride status updated successfully",
        data: totalEarning,
    });
}));
const setAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { availability } = req.body;
    const driver = req.user;
    const updateAvailability = yield ride_service_1.RideServices.setAvailability(driver, availability);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Driver availability updated successfully",
        data: updateAvailability,
    });
}));
exports.RideControllers = {
    rideRequest,
    getAllRide,
    getRideHistory,
    cancelRide,
    driverAcceptRide,
    driverRejectRide,
    driverUpdateRideStatus,
    driverTotalEarning,
    setAvailability,
};
