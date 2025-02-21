import { NextFunction, Request, Response } from "express";

interface AuthenticatedRequest extends Request {
    user?: {
        name: string;
        email: string;
        password: string;
        role: "admin" | "customer";
    };
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
