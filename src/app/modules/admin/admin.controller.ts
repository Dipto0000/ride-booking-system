import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getRideAnalytics = catchAsync(async (req, res, next) => {
    const analytics = await AdminServices.getRideAnalytics();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Ride analytics retrieved successfully",
        data: analytics,
    });
});

const getUserAnalytics = catchAsync(async (req, res, next) => {
    const analytics = await AdminServices.getUserAnalytics();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User analytics retrieved successfully",
        data: analytics,
    });
});

export const AdminControllers = {
    getRideAnalytics,
    getUserAnalytics,
};