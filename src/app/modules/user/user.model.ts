import { model, Schema } from "mongoose";
import { IDriverDetails, IsActive, IUser, Role } from "./user.interface";

const driverDetailsScrema = new Schema<IDriverDetails>({
    availability: {type: String, enum: ["online", "offline"], default: "offline"},
    totalEarnings: {type: Number, default: 0},
})

export const DriverDetails = model<IDriverDetails>("DriverDetails", driverDetailsScrema)

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE,
    },
    driverDetails: {type: Schema.Types.ObjectId, ref: "DriverDetails"},

},
{
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>("User", userSchema)