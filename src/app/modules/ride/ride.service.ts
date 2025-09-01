import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { Role } from "../user/user.interface";
import { set } from "mongoose";

const createRide = async (payload: Partial<IRide> & {riderName: string}) => {

    const {riderName, pickupLocation, destinationLocation, ...rest} = payload

    const rider = await User.findOne({name: riderName});
    const riderID = rider?._id

    if(!rider){
        throw new Error("Rider does not exist");
    }
    

    const ride = await Ride.create({
        rider: riderID,
        pickupLocation,
        destinationLocation, 
        ...rest})

    return ride;
}

const getAllRide = async() => {
    const allRide = await Ride.find();

    return allRide;
}

const getRideHistory = async(payload: string) => {
    
    const history = await Ride.find({rider: payload});

    
    return history;

}

const cancelRide = async(id: string, riderId: JwtPayload) => {

    let query: any;

    if(riderId.role === Role.RIDER){
        query = {_id: id, rider: riderId.userId};
    }else if(riderId.role === Role.ADMIN){
        query = {_id: id};
    }else{
        throw new Error("You are not authorized to cancel this ride");
    }

    const ride = await Ride.findOne(query);

    if(!ride ){
        throw new Error("Ride does not exist or you are not the rider");
    }

    if(ride.status !== RideStatus.REQUESTED ){
        throw new Error("Ride cannot be canceled as driver has accepted the ride already.");
    }



    ride.status = RideStatus.CANCELLED;
    await ride.save();

    return ride;
}

const driverAcceptRide = async(rideId: string, driver: JwtPayload) => {
    
    const ride = await Ride.findById(rideId)

    if(!ride){
        throw new Error("Ride does not exist");
    }

    if(ride.status !== RideStatus.REQUESTED){
        throw new Error("Ride already accepted or cancelled.");
    }

    ride.status = RideStatus.ACCEPTED;
    ride.driver = driver.userId;
    ride.acceptedAt = new Date();
    ride.rideHistory?.push({status: RideStatus.ACCEPTED, changedAt: new Date()});



    await ride.save();

    return ride;
}

const driverRejectRide = async(rideId: string, driver: JwtPayload) => {
    
    const ride = await Ride.findById(rideId)

    if(!ride){
        throw new Error("Ride does not exist");
    }

    if(ride.status !== RideStatus.REQUESTED){
        throw new Error("Ride cannot be rejected now.");
    }

    ride.status = RideStatus.CANCELLED;
    ride.cancelledAt = new Date();
    ride.rideHistory?.push({status: RideStatus.CANCELLED, changedAt: new Date()});


    await ride.save();

    return ride;

}

const driverUpdateRideStatus = async(rideId: string, driver: JwtPayload, status: string) => {
    
    const ride = await Ride.findOne({_id: rideId, driver: driver.userId})

    if(!ride){
        throw new Error("Ride does not exist or not assigned to you");
    }

    switch(status){
        case RideStatus.PICKED_UP:
            ride.status = RideStatus.PICKED_UP;
            ride.pickedUpAt = new Date();
            ride.rideHistory?.push({status: RideStatus.PICKED_UP, changedAt: new Date()});
            break;
        case RideStatus.IN_TRANSIT:
            ride.status = RideStatus.IN_TRANSIT;
            ride.inTransitAt = new Date();
            ride.rideHistory?.push({status: RideStatus.IN_TRANSIT, changedAt: new Date()});
            break;
        case RideStatus.COMPLETED:
            ride.status = RideStatus.COMPLETED;
            ride.completedAt = new Date();

            await User.findByIdAndUpdate(driver.userId, {
                $inc: {"driverDetails.totalEarning": ride.fare}
            })

            ride.rideHistory?.push({status: RideStatus.COMPLETED, changedAt: new Date()});
            break;
        default:
            throw new Error("Invalid status");
    }


    await ride.save();

    return ride;


}

const driverTotalEarning = async(driver: JwtPayload) => {

    const user = await User.findById(driver.userId);

    if(!user || user.role !== Role.DRIVER){
        throw new Error("You are not a driver");
    }

    return {
        totalEarning: user.driverDetails?.totalEarnings || 0
    }
}

const setAvailability = async(driver: JwtPayload, availability: "online" | "offline") => {

    const user = await User.findById(driver.userId);

    if(!user || user.role !== Role.DRIVER){
        throw new Error("You are not a driver");
    }

    user.driverDetails = user.driverDetails || {availability: "offline", totalEarnings: 0};
    user.driverDetails.availability = availability;


    await user.save();

    return user;


    
}


export const RideServices = {
    createRide,
    getAllRide,
    getRideHistory,
    cancelRide,
    driverAcceptRide,
    driverRejectRide,
    driverUpdateRideStatus,
    driverTotalEarning,
    setAvailability,
}