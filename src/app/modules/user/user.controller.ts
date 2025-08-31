import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const createUser = catchAsync(async(req, res, next) => {
    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: user,

    })
})

const getAllUser = catchAsync(async (req, res, next) => {
    const users = await UserServices.getAllUser()     

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retreived successfully",
        data: users,

    })
})

const approveDriver = catchAsync(async(req, res, next) => {
    const {id} = req.params;

    const updateDriverStatus = await UserServices.approveDriver(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Driver approved successfully",
        data: updateDriverStatus,
    })



})

const suspendDriver = catchAsync(async(req, res, next) => {
    const {id} = req.params;

    const updateDriverStatus = await UserServices.suspendDriver(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Driver suspended successfully",
        data: updateDriverStatus,
    })
})

const blockUser = catchAsync(async(req, res, next) => {
    const {id} = req.params;

    const updateDriverStatus = await UserServices.blockUser(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Driver suspended successfully",
        data: updateDriverStatus,
    })
})

const unblockUser = catchAsync(async(req, res, next) => {
    const {id} = req.params;

    const updateDriverStatus = await UserServices.unblockUser(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Driver suspended successfully",
        data: updateDriverStatus,
    })
})

export const UserControllers = {
    createUser,
    getAllUser,
    approveDriver,
    suspendDriver,
    blockUser,
    unblockUser,
}