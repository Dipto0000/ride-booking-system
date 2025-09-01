import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

export const checkAuth = (...authRoles : string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const accessToken = req.headers.authorization;
        if(!accessToken){
            throw new Error("Access token is required");
        }

        const verifiedToken = verifyToken(accessToken, process.env.JWT_SECRET_KEY as string) as JwtPayload;

        const isUserExist = await User.findOne({email: verifiedToken.email});

        if(!isUserExist){
            throw new Error("User does not exist");
        }

        if(isUserExist.accountStatus === "Blocked" || isUserExist.driverStatus === "Suspended"){
            throw new Error("User is blocked or suspended");
        }

        if(!authRoles.includes(isUserExist.role)){
            throw new Error("You are not authorized to access this route");
        }

        req.user = verifiedToken;
        next();

    } catch (error) {
        console.log(error);
        next(error)
    }
}