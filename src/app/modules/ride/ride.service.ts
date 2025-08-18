import { User } from "../user/user.model";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";

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

    console.log("history", history);
    return history;

}

const cancelRide = async(id: string, riderId: string) => {


    const ride = await Ride.findOne({_id: id, rider: riderId});

    if(!ride){
        throw new Error("Ride does not exist or you are not the rider");
    }

    if(ride.status !== RideStatus.REQUESTED){
        throw new Error("Ride is not in requested status");
    }

    ride.status = RideStatus.CANCELLED;
    await ride.save();

    return ride;
}



export const RideServices = {
    createRide,
    getAllRide,
    getRideHistory,
    cancelRide
}