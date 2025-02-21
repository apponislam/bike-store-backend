import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userServices.createUserIntoDB(user);

    const responseData = {
        _id: result._id,
        name: result.name,
        email: result.email,
    };

    res.status(201).json({
        success: true,
        message: "User Registered successfully",
        statusCode: 201,
        data: responseData,
    });
});

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { token, name, email: userEmail } = await userServices.loginUser(email, password);

    res.status(200).json({
        success: true,
        message: "Login successful",
        statusCode: 200,
        data: {
            token,
        },
    });
});

export const userController = {
    createUser,
    loginUser,
};
