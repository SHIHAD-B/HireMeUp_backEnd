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
exports.tokenRefreshController = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const accessToken_1 = require("../../utils/generateToken/accessToken");
const config_1 = require("../../config/envConfig/config");
const refreshTokenSchema_1 = __importDefault(require("../../infrastructure/database/mongoDB/model/refreshTokenSchema"));
/**
 * tokenRefreshController - Handles access token refresh process.
 *
 * This controller:
 * 1. Determines the type of token (user, company, or admin) based on the cookie present in the request.
 * 2. Verifies the validity of the access token using JWT_SECRET.
 * 3. If the access token is valid:
 *    - Returns a success response indicating the access token is still valid.
 * 4. If the access token is expired or invalid:
 *    - Handles TokenExpiredError and JsonWebTokenError appropriately and returns corresponding error responses.
 *    - Decodes the access token to extract user information if verification fails.
 *    - Retrieves refresh token data from the database using the user's ID.
 *    - Checks if the refresh token exists and is not expired.
 *    - Generates a new access token and stores it in an HTTP-only cookie.
 *    - Returns a success response with the refreshed access token and user details.
 * 5. Catches and forwards any errors that occur during the process to the error handler middleware.
 */
const tokenRefreshController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tokenName = req.cookies['user_token'] ? 'user_token' :
                req.cookies['Company_token'] ? 'Company_token' :
                    req.cookies['admin_token'] ? 'admin_token' : null;
            if (!tokenName) {
                return next(errorResponse_1.default.unauthorized('Cannot find token'));
            }
            const accessToken = req.cookies[tokenName];
            if (!accessToken) {
                return next(errorResponse_1.default.unauthorized('Access token not provided'));
            }
            let decodedAccessToken = null;
            try {
                decodedAccessToken = jsonwebtoken_1.default.verify(accessToken, config_1.JWT_SECRET);
                return res.status(200).json({
                    success: true,
                    user: decodedAccessToken,
                    message: "Access token is still valid"
                });
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                }
                else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                    return next(errorResponse_1.default.unauthorized('Invalid access token'));
                }
                else {
                    return next(errorResponse_1.default.internalError('An error occurred while verifying access token'));
                }
            }
            decodedAccessToken = jsonwebtoken_1.default.decode(accessToken);
            if (!decodedAccessToken) {
                return next(errorResponse_1.default.unauthorized('Invalid access token data'));
            }
            const userId = decodedAccessToken._id;
            const refreshData = yield refreshTokenSchema_1.default.findOne({ coreId: userId });
            if (!refreshData) {
                return next(errorResponse_1.default.unauthorized('Refresh token not found'));
            }
            const { token: refreshToken, expiryDate } = refreshData;
            const now = new Date();
            if (expiryDate < now) {
                return next(errorResponse_1.default.unauthorized('Refresh token expired'));
            }
            const newAccessToken = (0, accessToken_1.generateAccessToken)(decodedAccessToken);
            res.cookie(tokenName, newAccessToken, {
                httpOnly: true,
            });
            res.status(200).json({
                success: true,
                user: decodedAccessToken,
                message: "Access token refreshed"
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.tokenRefreshController = tokenRefreshController;
