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





export const UserControllers = {
    createUser,
    getAllUser,
}