// import { NextFunction, Request, Response } from "express";
// import AppError from "../errors/AppError";

// const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//     let statusCode = err.statusCode || 500;
//     let message = err.message || "Something went wrong";

//     if (err.name == "ZodError") {
//         message = err.issues[0].message;
//         statusCode = 400;
//     }

//     // Check if it's a custom AppError
//     if (err instanceof AppError) {
//         statusCode = err.statusCode;
//         message = err.message;
//     }

//     if (err.message.includes("Blog not found")) {
//         // message = "Blog not found.";
//         // statusCode = 404;
//     } else if (err.message.includes("You are not authorized to update this blog")) {
//         statusCode = 403;
//     }

//     res.status(statusCode).json({
//         success: false,
//         message: message,
//         statusCode: statusCode,
//         error: err instanceof AppError ? {} : err,
//         stack: err.stack,
//     });
// };

// export default globalErrorHandler;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import { TErrorSources } from "../interface/error";
import handleZodError from "./handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
    // console.log(err.statusCode);
    //setting default values
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSources: TErrorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }

    //ultimate return
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config.node_env === "development" ? err?.stack : null,
    });
};

export default globalErrorHandler;
