import { User } from "../user/user.model";
import { IRide } from "./ride.interface";
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



export const RideServices = {
    createRide,
    getAllRide,
    getRideHistory
}