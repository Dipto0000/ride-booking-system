import { NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RideServices } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { set } from "mongoose";


const rideRequest = catchAsync(async(req, res) => {

    const createRide = await RideServices.createRide(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Ride created successfully",
        data: createRide,
    })

})

const getAllRide = catchAsync(async(req, res) => {

    const allRide = await RideServices.getAllRide();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rides retreived successfully",
        data: allRide,
    })
})

const getRideHistory = catchAsync(async(req, res) => {


    
    const riderID = req.user?.userId;

    const rideHistory = await RideServices.getRideHistory(riderID);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride history retreived successfully",
        data: rideHistory,
    })
})

const cancelRide = catchAsync(async(req, res) => {

    const {id} = req.params;
    const rider = req.user;

    const cancelRide = await RideServices.cancelRide(id, rider as JwtPayload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride cancelled successfully",
        data: cancelRide,
    })
})


const driverAcceptRide = catchAsync(async(req, res) => {

    const {id} = req.params;
    const driver = req.user as JwtPayload;

    const acceptRide = await RideServices.driverAcceptRide(id, driver);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride accepted successfully",
        data: acceptRide,
    })
})

const driverRejectRide = catchAsync(async(req, res) => {

    const {id} = req.params;
    const driver = req.user as JwtPayload;

    const rejectRide = await RideServices.driverRejectRide(id, driver);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride rejected successfully",
        data: rejectRide,
    })
})

const driverUpdateRideStatus = catchAsync(async(req, res) => {

    const {id} = req.params;
    const driver  = req.user as JwtPayload;
    const {status} = req.body;

    const updateRideStatus = await RideServices.driverUpdateRideStatus(id, driver, status);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride status updated successfully",
        data: updateRideStatus,
    })
})


const driverTotalEarning = catchAsync(async(req, res) => {

    const driver  = req.user as JwtPayload;

    const totalEarning = await RideServices.driverTotalEarning(driver);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride status updated successfully",
        data: totalEarning,
    })
})


const setAvailability = catchAsync(async(req, res) => {

    const {availability} = req.body;
    const driver  = req.user as JwtPayload;

    const updateAvailability = await RideServices.setAvailability(driver, availability);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Driver availability updated successfully",
        data: updateAvailability,
    })
})




export const RideControllers = {

    rideRequest,
    getAllRide,
    getRideHistory,
    cancelRide,
    driverAcceptRide,
    driverRejectRide,
    driverUpdateRideStatus,
    driverTotalEarning,
    setAvailability,
}