"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    var _a;
    const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (userRole !== "admin") {
        res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
            statusCode: 403,
        });
    }
    else {
        next();
    }
};
exports.isAdmin = isAdmin;
