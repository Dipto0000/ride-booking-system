import { AccountStatus, DriverStatus, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";


const createUser = async(payload: Partial<IUser>) => {

    const {email, password,  ...rest} = payload;

    const isUserExist = await User.findOne({email})

    if(isUserExist){
        throw new Error("User already exist");
    }

    const hashedPassword = await bcryptjs.hash(password as string, 10)

    

    
    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
    })
    return user;
}

const getAllUser = async()=>{
    const users = await User.find()

    const totalUsers = await User.countDocuments();

    return users;
}

const approveDriver = async(id: string) => {

    const driver = await User.findOneAndUpdate({_id: id}, {driverStatus: DriverStatus.APPROVED}, {new: true});

    return driver
}

const suspendDriver = async(id: string) => {

    const driver = await User.findOneAndUpdate({_id: id}, {driverStatus: DriverStatus.SUSPENDED}, {new: true});

    return driver
}

const blockUser = async(id: string) => {

    const user = await User.findOneAndUpdate({_id: id}, {accountStatus: AccountStatus.BLOCKED}, {new: true});

    return user
}

const unblockUser = async(id: string) => {

    const user = await User.findOneAndUpdate({_id: id}, {accountStatus: AccountStatus.ACTIVE}, {new: true});

    return user
}






export const UserServices = {
        createUser,
        getAllUser,
        approveDriver,
        suspendDriver,
        blockUser,
        unblockUser,
    }