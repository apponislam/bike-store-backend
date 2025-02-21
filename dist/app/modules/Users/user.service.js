"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = exports.loginUser = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_utils_1 = require("./users.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.create(payload);
    return result;
});
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, users_utils_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_expire);
    const refreshToken = (0, users_utils_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_refresh_expire);
    return { accessToken, refreshToken, name: user.name, email: user.email, role: user.role };
});
exports.loginUser = loginUser;
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, users_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    const user = yield user_model_1.userModel.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, users_utils_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_expire);
    return {
        accessToken,
    };
});
exports.userServices = {
    createUserIntoDB,
    loginUser: exports.loginUser,
    refreshToken,
};
