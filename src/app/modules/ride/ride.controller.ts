import { NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RideServices } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";


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


    console.log("Jwt user", req.user);
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
    const rider = req.user?.userId;

    const cancelRide = await RideServices.cancelRide(id, rider);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride cancelled successfully",
        data: cancelRide,
    })
})




export const RideControllers = {

    rideRequest,
    getAllRide,
    getRideHistory,
    cancelRide
}