import express from "express";
import { userController } from "./users.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidation, { refreshTokenValidation, userLoginValidation } from "./user.validation";

const router = express.Router();

router.post("/api/users/register", validateRequest(userValidation), userController.createUser);
// router.post("/api/users/register", userController.createUser);
router.post("/api/users/login", validateRequest(userLoginValidation), userController.loginUser);

router.post("/api/users/refresh-token", validateRequest(refreshTokenValidation), userController.refreshToken);

export const userRoute = router;
