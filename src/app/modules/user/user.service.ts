import { IUser } from "./user.interface";
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






export const UserServices = {
        createUser,
        getAllUser,
    }