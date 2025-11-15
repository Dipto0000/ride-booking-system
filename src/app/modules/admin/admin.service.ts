import { Ride } from "../ride/ride.model";
import { User } from "../user/user.model";

const getRideAnalytics = async () => {
    const totalRides = await Ride.countDocuments();
    const totalEarnings = await Ride.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$fare" },
            },
        },
    ]);

    return {
        totalRides,
        totalEarnings: totalEarnings[0]?.total || 0,
    };
};

const getUserAnalytics = async () => {
    const totalUsers = await User.countDocuments();
    const totalRiders = await User.countDocuments({ role: "Rider" });
    const totalDrivers = await User.countDocuments({ role: "Driver" });

    return {
        totalUsers,
        totalRiders,
        totalDrivers,
    };
};

export const AdminServices = {
    getRideAnalytics,
    getUserAnalytics,
};