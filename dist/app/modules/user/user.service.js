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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new Error("User already exist");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword }, rest));
    return user;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    const totalUsers = yield user_model_1.User.countDocuments();
    return users;
});
const approveDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield user_model_1.User.findOneAndUpdate({ _id: id }, { driverStatus: user_interface_1.DriverStatus.APPROVED }, { new: true });
    return driver;
});
const suspendDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield user_model_1.User.findOneAndUpdate({ _id: id }, { driverStatus: user_interface_1.DriverStatus.SUSPENDED }, { new: true });
    return driver;
});
const blockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ _id: id }, { accountStatus: user_interface_1.AccountStatus.BLOCKED }, { new: true });
    return user;
});
const unblockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ _id: id }, { accountStatus: user_interface_1.AccountStatus.ACTIVE }, { new: true });
    return user;
});
exports.UserServices = {
    createUser,
    getAllUser,
    approveDriver,
    suspendDriver,
    blockUser,
    unblockUser,
};
