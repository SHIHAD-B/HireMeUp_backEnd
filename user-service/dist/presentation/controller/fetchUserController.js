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
exports.fetchUserController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/envConfig/config");
const fetchUserController = (dependencies) => {
    const { useCases: { fetchUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("reached fetch user");
            const { user_token } = req.cookies;
            if (!user_token) {
                return next(errorResponse_1.default.badRequest("User token is missing."));
            }
            const deToken = jsonwebtoken_1.default.verify(user_token, config_1.JWT_SECRET, (error, decode) => {
                if (error) {
                    return null;
                }
                return decode;
            });
            const { email } = deToken;
            if (!email) {
                return next(errorResponse_1.default.badRequest("User ID is missing."));
            }
            const user = yield fetchUserUseCase(dependencies).execute(email);
            if (!user) {
                return next(errorResponse_1.default.notFound("User not found or unable to fetch user."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: user,
                    message: "User fetched successfully."
                });
            }
        }
        catch (error) {
            console.error("Error fetching user:", error);
            return next(errorResponse_1.default.internalError("Failed to fetch user."));
        }
    });
};
exports.fetchUserController = fetchUserController;
