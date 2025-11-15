import { AccountStatus, DriverStatus, IEmergencyContact, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";


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

const getAllUser = async(query: any)=>{
    const { role, status } = query;
    const filter: any = {};

    if (role) {
        filter.role = role;
    }

    if (status) {
        filter.accountStatus = status;
    }

    const users = await User.find(filter);

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

const getMe = async (user: JwtPayload) => {
    const result = await User.findById(user.userId);
    return result;
}

const updateMe = async (user: JwtPayload, payload: Partial<IUser>) => {
    const { password, ...rest } = payload;

    const updatedUserData:Partial<IUser> = {...rest}

    if (password) {
        const hashedPassword = await bcryptjs.hash(password, 10);
        updatedUserData.password = hashedPassword;
    }

    const result = await User.findByIdAndUpdate(user.userId, updatedUserData, { new: true });
    return result;
}

const addEmergencyContact = async (user: JwtPayload, payload: IEmergencyContact) => {
    const result = await User.findByIdAndUpdate(
        user.userId,
        { $push: { emergencyContacts: payload } },
        { new: true }
    );
    return result;
};

const getEmergencyContacts = async (user: JwtPayload) => {
    const result = await User.findById(user.userId).select("emergencyContacts");
    return result;
};

const deleteEmergencyContact = async (user: JwtPayload, contactId: string) => {
    const result = await User.findByIdAndUpdate(
        user.userId,
        { $pull: { emergencyContacts: { _id: contactId } } },
        { new: true }
    );
    return result;
};



export const UserServices = {
        createUser,
        getAllUser,
        approveDriver,
        suspendDriver,
        blockUser,
        unblockUser,
        getMe,
        updateMe,
        addEmergencyContact,
        getEmergencyContacts,
        deleteEmergencyContact,
    }