"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = __importStar(require("./user.validation"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/api/users", users_controller_1.userController.alUsers);
router.post("/api/users/register", (0, validateRequest_1.default)(user_validation_1.default), users_controller_1.userController.createUser);
router.post("/api/users/login", (0, validateRequest_1.default)(user_validation_1.userLoginValidation), users_controller_1.userController.loginUser);
router.post("/api/users/refresh-token", (0, validateRequest_1.default)(user_validation_1.refreshTokenValidation), users_controller_1.userController.refreshToken);
router.post("/api/users/change-password", auth_1.default, (0, validateRequest_1.default)(user_validation_1.changePasswordValidationSchema), users_controller_1.userController.changePassword);
router.put("/api/users/change-status/:userId", auth_1.default, users_controller_1.userController.toggleUserStatus);
exports.userRoute = router;
