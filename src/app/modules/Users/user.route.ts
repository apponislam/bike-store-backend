import express from "express";
import { userController } from "./users.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidation, { changePasswordValidationSchema, refreshTokenValidation, userLoginValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/api/users", userController.alUsers);

router.post("/api/users/register", validateRequest(userValidation), userController.createUser);

router.post("/api/users/login", validateRequest(userLoginValidation), userController.loginUser);

router.post("/api/users/refresh-token", validateRequest(refreshTokenValidation), userController.refreshToken);

router.post("/api/users/change-password", auth, validateRequest(changePasswordValidationSchema), userController.changePassword);

router.put("/api/users/change-status/:userId", auth, userController.toggleUserStatus);

export const userRoute = router;
