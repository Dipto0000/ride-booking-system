import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { Role } from "../user/user.interface";
import { set } from "mongoose";

const getRideById = async (id: string) => {
    const ride = await Ride.findById(id);
    if (!ride) {
        throw new Error("Ride not found");
    }
    return ride;
};

const estimateFare = async (payload: Partial<IRide>) => {
    // For now, we'll return a fixed fare.
    // In a real application, you would calculate the fare based on the distance between pickup and destination.
    return 100;
};

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

const getAllRide = async(query: any) => {
    const { status, date, driver, rider } = query;
    const filter: any = {};

    if (status) {
        filter.status = status;
    }

    if (date) {
        filter.createdAt = {
            $gte: new Date(date as string),
            $lt: new Date(new Date(date as string).getTime() + 24 * 60 * 60 * 1000)
        };
    }

    if (driver) {
        filter.driver = driver;
    }

    if (rider) {
        filter.rider = rider;
    }

    const allRide = await Ride.find(filter);

    return allRide;
}

const getRideHistory = async(user: JwtPayload, query: any) => {
    const { page = 1, limit = 10, status, date } = query;
    const filter: any = {};

    if (user.role === Role.RIDER) {
        filter.rider = user.userId;
    } else if (user.role === Role.DRIVER) {
        filter.driver = user.userId;
    }

    if (status) {
        filter.status = status;
    }

    if (date) {
        filter.createdAt = {
            $gte: new Date(date as string),
            $lt: new Date(new Date(date as string).getTime() + 24 * 60 * 60 * 1000)
        };
    }

    const history = await Ride.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Ride.countDocuments(filter);

    return {
        history,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    };
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

const driverTotalEarning = async(driver: JwtPayload, query: any) => {
    const { period } = query;
    let startDate: Date;

    switch (period) {
        case 'daily':
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'weekly':
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'monthly':
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            startDate.setHours(0, 0, 0, 0);
            break;
        default:
            const user = await User.findById(driver.userId);
            if (!user || user.role !== Role.DRIVER) {
                throw new Error("You are not a driver");
            }
            return {
                totalEarning: user.driverDetails?.totalEarnings || 0
            };
    }

    const rides = await Ride.find({
        driver: driver.userId,
        status: RideStatus.COMPLETED,
        completedAt: { $gte: startDate }
    });

    const totalEarning = rides.reduce((acc, ride) => acc + ride.fare, 0);

    return {
        totalEarning
    };
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

const triggerSOS = async (rideId: string, user: JwtPayload) => {
    const ride = await Ride.findById(rideId);
    if (!ride) {
        throw new Error("Ride not found");
    }

    const userInDb = await User.findById(user.userId);
    if (!userInDb) {
        throw new Error("User not found");
    }

    const emergencyContacts = userInDb.emergencyContacts;
    if (!emergencyContacts || emergencyContacts.length === 0) {
        throw new Error("No emergency contacts found for this user");
    }

    // In a real app, you would send notifications to the emergency contacts.
    // For now, we'll just log a message to the console.
    console.log(`SOS triggered for ride ${rideId} by user ${user.userId}.`);
    console.log("Notifying emergency contacts:", emergencyContacts);

    return {
        message: "SOS triggered. Your emergency contacts have been notified.",
    };
};


export const RideServices = {
    getRideById,
    estimateFare,
    createRide,
    getAllRide,
    getRideHistory,
    cancelRide,
    driverAcceptRide,
    driverRejectRide,
    driverUpdateRideStatus,
    driverTotalEarning,
    setAvailability,
    triggerSOS,
}