import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import userModel from "../modules/Users/user.model";
import config from "../config";

const auth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization; // Get the token from the header
    if (!token) {
        throw new Error("Authentication failed: No token provided");
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as { email: string };

    const user = await userModel.findOne({ email: decoded?.email });
    if (!user) {
        throw new Error("Authentication failed: User not found");
    }

    req.user = user;
    next();
});

export default auth;
