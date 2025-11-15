import e, { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { AuthTokens, setAuthCookie } from "../../utils/setCookie";

const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialLogin(req.body)

    
    // const {accessToken, refreshToken} = loginInfo.userToken;

    // setAuthCookie(res, {
    //     accessToken: accessToken,
    //     refreshToken: refreshToken
    // });


    setAuthCookie(res, loginInfo.userToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: {
            user: loginInfo.user,
            toeknInfo: loginInfo.userToken,
        }
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken",{
        httpOnly: true,
        secure: false,
        sameSite: "lax"

    })

    res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
        data: null
    })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        throw new Error("Refresh token is required");
    }

    const toeknInfo = await AuthService.getNewAccessToken(refreshToken as string);

});

const forgotPassword = catchAsync(async(req, res, next) => {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password reset link sent successfully",
        data: result,
    })
})

const resetPassword = catchAsync(async(req, res, next) => {
    const { token, password } = req.body;
    const result = await AuthService.resetPassword(token, password);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password reset successfully",
        data: result,
    })
})

export const AuthControllers = {
    credentialLogin,
    logout,
    getNewAccessToken,
    forgotPassword,
    resetPassword
}