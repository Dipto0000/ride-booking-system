import { JwtPayload} from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";

export const createUserToken = (user: Partial<IUser>) => {
    
    const JwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateToken(JwtPayload, process.env.JWT_SECRET_KEY as string, process.env.JWT_ACCESS_EXPIRES as string)

    const refreshToken = generateToken(JwtPayload, process.env.JWT_SECRET_KEY as string, process.env.JWT_REFRESH_EXPIRES as string)

    return {
        accessToken,
        refreshToken
    }
}

export const createNewUserTokenWithRefreshToken = async(refreshToken: string) => {
    
    const verifiedRefreshToken = verifyToken(refreshToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
    
    const isUserExist = await User.findOne({email: verifiedRefreshToken.email})


    if(!isUserExist){
        throw new Error("User does not exist");
    }

    if(isUserExist.isActive === "Blocked" || isUserExist.isActive === "Suspended"){
        throw new Error("User is blocked or suspended");
    }

    const JwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(JwtPayload, process.env.JWT_SECRET_KEY as string, process.env.JWT_ACCESS_EXPIRES as string)

    return accessToken;
}