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
exports.blockUserController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * blockUserController - Controller function to handle blocking a user.
 *
 * This controller:
 * 1. Validates the incoming request body for the `email` of the user.
 *    - If validation fails (missing `email`), returns a bad request error.
 * 2. Calls the `blockUserUseCase` to perform the blocking operation.
 *    - If the operation fails (user not found or unable to block user), returns a not found or internal error.
 * 3. Returns a success response with the blocked user object upon successful operation.
 */
const blockUserController = (dependencies) => {
    const { useCases: { blockUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userEmail = req.body.email;
            if (!userEmail) {
                return next(errorResponse_1.default.badRequest("User ID is missing."));
            }
            const blockeddUser = yield blockUserUseCase(dependencies).execute(userEmail);
            if (!blockeddUser) {
                return next(errorResponse_1.default.notFound("User not found or unable to block user."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "User blocked successfully."
                });
            }
        }
        catch (error) {
            console.error("Error blocking user:", error);
            return next(errorResponse_1.default.internalError("Failed to block user."));
        }
    });
};
exports.blockUserController = blockUserController;
