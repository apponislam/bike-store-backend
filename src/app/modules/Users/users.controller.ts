import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userServices.createUserIntoDB(user);

    const responseData = {
        _id: result._id,
        name: result.name,
        email: result.email,
    };

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Registered successfully",
        data: responseData,
    });
});

const alUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.allUsers();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Users retrived successfully",
        data: result,
    });
});

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await userServices.loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
        secure: config.node_env === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Login successful",
        data: {
            accessToken,
        },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await userServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token retrieved succesfully!",
        data: result,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;

    // console.log(req.user);

    const result = await userServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password is updated succesfully!",
        data: result,
    });
});

export const userController = {
    createUser,
    alUsers,
    loginUser,
    refreshToken,
    changePassword,
};
