"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const setCookie_1 = require("../../utils/setCookie");
const credentialLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.AuthService.credentialLogin(req.body);
    // const {accessToken, refreshToken} = loginInfo.userToken;
    // setAuthCookie(res, {
    //     accessToken: accessToken,
    //     refreshToken: refreshToken
    // });
    (0, setCookie_1.setAuthCookie)(res, loginInfo.userToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: {
            user: loginInfo.user,
            toeknInfo: loginInfo.userToken,
        }
    });
}));
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
        data: null
    });
}));
const getNewAccessToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new Error("Refresh token is required");
    }
    const toeknInfo = yield auth_service_1.AuthService.getNewAccessToken(refreshToken);
}));
exports.AuthControllers = {
    credentialLogin,
    logout,
    getNewAccessToken
};
