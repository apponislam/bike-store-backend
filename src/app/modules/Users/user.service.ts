import config from "../../config";
import { userModel } from "./user.model";
import { TUser } from "./users.interface";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "./users.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {
    const result = await userModel.create(payload);
    return result;
};

export const loginUser = async (email: string, password: string) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(jwtPayload, config.jwt_secret as string, config.jwt_access_expire as string);

    const refreshToken = createToken(jwtPayload, config.jwt_secret as string, config.jwt_refresh_expire as string);

    return { accessToken, refreshToken, name: user.name, email: user.email, role: user.role };
};

const refreshToken = async (token: string) => {
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    const { email } = decoded;

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(jwtPayload, config.jwt_secret as string, config.jwt_access_expire as string);

    return {
        accessToken,
    };
};

export const userServices = {
    createUserIntoDB,
    loginUser,
    refreshToken,
};
