import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken"; // Assuming JwtPayload type is coming from jsonwebtoken

interface AuthenticatedRequest extends Request {
    user: JwtPayload; // user is no longer optional
}

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (userRole !== "admin") {
        res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
            statusCode: 403,
        });
    } else {
        next();
    }
};
