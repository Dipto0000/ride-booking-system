"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const driverDetailsSchema = new mongoose_1.Schema({
    availability: { type: String, enum: ["online", "offline"], default: "offline" },
    totalEarnings: { type: Number, default: 0 },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.RIDER
    },
    accountStatus: {
        type: String,
        enum: Object.values(user_interface_1.AccountStatus),
        default: user_interface_1.AccountStatus.ACTIVE
    },
    driverStatus: {
        type: String,
        enum: Object.values(user_interface_1.DriverStatus),
        default: user_interface_1.DriverStatus.PENDING
    },
    driverDetails: { type: driverDetailsSchema, default: {} },
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)("User", userSchema);
