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
exports.checkAuth = void 0;
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../modules/user/user.model");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new Error("Access token is required");
        }
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, process.env.JWT_SECRET_KEY);
        const isUserExist = yield user_model_1.User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new Error("User does not exist");
        }
        if (isUserExist.accountStatus === "Blocked" || isUserExist.driverStatus === "Suspended") {
            throw new Error("User is blocked or suspended");
        }
        if (!authRoles.includes(isUserExist.role)) {
            throw new Error("You are not authorized to access this route");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
