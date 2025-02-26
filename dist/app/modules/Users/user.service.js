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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_utils_1 = require("./users.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("./user.model"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    return result;
});
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find().select("-password");
    return result;
});
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.default(401, "Invalid credentials");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === "blocked") {
        throw new AppError_1.default(403, "You are blocked!");
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
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
    const user = yield user_model_1.default.findOne({ email });
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
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userData.email });
    // console.log(userModel);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // console.log(userModel.isPasswordMatched);
    const isMatched = yield user_model_1.default.isPasswordMatched(payload.oldPassword, user.password);
    if (!isMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.default.findOneAndUpdate({
        email: userData.email,
        role: userData.role,
    }, {
        password: newHashedPassword,
    });
    return null;
});
const updateUserStatus = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    user.status = user.status === "active" ? "blocked" : "active";
    yield user.save();
    return user;
});
exports.userServices = {
    createUserIntoDB,
    allUsers,
    loginUser: exports.loginUser,
    refreshToken,
    changePassword,
    updateUserStatus,
};
