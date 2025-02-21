import config from "../../config";
import { userModel } from "./user.model";
import { TUser } from "./users.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: "30d" });

    return { token, name: user.name, email: user.email };
};

export const userServices = {
    createUserIntoDB,
    loginUser,
};
