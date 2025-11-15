import { setAuthCookie } from "../../utils/setCookie";
import { createNewUserTokenWithRefreshToken, createUserToken } from "../../utils/userTokens";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

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

const forgotPassword = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User does not exist");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    // In a real app, you would send the resetToken to the user's email
    console.log({ resetToken });

    return {
        message: "Password reset token sent to your email",
    };
};

const resetPassword = async (token: string, password: string) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error("Token is invalid or has expired");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return {
        message: "Password has been reset",
    };
};

export const AuthService = {
    credentialLogin,
    getNewAccessToken,
    forgotPassword,
    resetPassword,
}