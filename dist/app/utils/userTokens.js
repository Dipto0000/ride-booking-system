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
exports.createNewUserTokenWithRefreshToken = exports.createUserToken = void 0;
const jwt_1 = require("./jwt");
const user_model_1 = require("../modules/user/user.model");
const createUserToken = (user) => {
    const JwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(JwtPayload, process.env.JWT_SECRET_KEY, process.env.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.generateToken)(JwtPayload, process.env.JWT_SECRET_KEY, process.env.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserToken = createUserToken;
const createNewUserTokenWithRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefreshToken = (0, jwt_1.verifyToken)(refreshToken, process.env.JWT_SECRET_KEY);
    const isUserExist = yield user_model_1.User.findOne({ email: verifiedRefreshToken.email });
    if (!isUserExist) {
        throw new Error("User does not exist");
    }
    if (isUserExist.accountStatus === "Blocked" || isUserExist.driverStatus === "Suspended") {
        throw new Error("User is blocked or suspended");
    }
    const JwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };
    const accessToken = (0, jwt_1.generateToken)(JwtPayload, process.env.JWT_SECRET_KEY, process.env.JWT_ACCESS_EXPIRES);
    return accessToken;
});
exports.createNewUserTokenWithRefreshToken = createNewUserTokenWithRefreshToken;
