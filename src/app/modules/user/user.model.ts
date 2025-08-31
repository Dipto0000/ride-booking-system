import { model, Schema } from "mongoose";
import { AccountStatus, DriverStatus, IDriverDetails, IUser, Role } from "./user.interface";

const driverDetailsSchema = new Schema<IDriverDetails>({
    availability: {type: String, enum: ["online", "offline"], default: "offline"},
    totalEarnings: {type: Number, default: 0},
}, {_id: false})
const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String},
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.RIDER
    },
    accountStatus: {
        type: String,
        enum: Object.values(AccountStatus),
        default: AccountStatus.ACTIVE
    },
    driverStatus: {
        type: String,
        enum: Object.values(DriverStatus),
        default: DriverStatus.PENDING
    },
    driverDetails: {type: driverDetailsSchema, default: {}},

},
{
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>("User", userSchema)