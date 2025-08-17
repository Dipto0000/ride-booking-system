import { setAuthCookie } from "../../utils/setCookie";
import { createNewUserTokenWithRefreshToken, createUserToken } from "../../utils/userTokens";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";

const credentialLogin = async (payload: Partial<IUser>) => {

    const {email, password} = payload;

    const isUserExist = await User.findOne({email});

    if(!isUserExist){
        throw new Error("User does not exist");
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);

    if(!isPasswordMatched){
        throw new Error("Incorrect password");

    }

    const userToken = createUserToken(isUserExist);

    

    const {password: pass, ...rest} = isUserExist.toObject();

    if(isUserExist.role !== "Driver"){
        delete isUserExist.driverDetails
    };

    return {
        user: rest,
        userToken,
    }
    
}

const getNewAccessToken = async (refreshToken: string) => {
    const getNewAccessToken = await createNewUserTokenWithRefreshToken(refreshToken);
}

export const AuthService = {
    credentialLogin,
    getNewAccessToken
}