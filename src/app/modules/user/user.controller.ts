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
    const users = await UserServices.getAllUser(req.query)     

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

const getMe = catchAsync(async(req, res, next) => {
    const user = await UserServices.getMe(req.user!);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: user,
    })
})

const updateMe = catchAsync(async(req, res, next) => {
    const user = await UserServices.updateMe(req.user!, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: user,
    })
})

const addEmergencyContact = catchAsync(async(req, res, next) => {
    const user = await UserServices.addEmergencyContact(req.user!, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Emergency contact added successfully",
        data: user,
    })
})

const getEmergencyContacts = catchAsync(async(req, res, next) => {
    const contacts = await UserServices.getEmergencyContacts(req.user!);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Emergency contacts retrieved successfully",
        data: contacts,
    })
})

const deleteEmergencyContact = catchAsync(async(req, res, next) => {
    const user = await UserServices.deleteEmergencyContact(req.user!, req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Emergency contact deleted successfully",
        data: user,
    })
})

export const UserControllers = {
    createUser,
    getAllUser,
    approveDriver,
    suspendDriver,
    blockUser,
    unblockUser,
    getMe,
    updateMe,
    addEmergencyContact,
    getEmergencyContacts,
    deleteEmergencyContact
}