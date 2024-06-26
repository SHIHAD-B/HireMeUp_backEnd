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
exports.unblockUserController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * unblockUserController - Controller function to unblock a user.
 *
 * This controller:
 * 1. Retrieves the user's email from the request body.
 *    - Returns a bad request error if email is missing.
 * 2. Calls the `unblockUserUseCase` to execute unblocking the user based on the provided email.
 *    - Returns a not found error if user is not found or unable to unblock.
 * 3. Returns a success response with the unblocked user's details upon successful unblocking.
 * 4. Handles and logs any caught errors during the execution..
 */
const unblockUserController = (dependencies) => {
    const { useCases: { unblockUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userEmail = req.body.email;
            if (!userEmail) {
                return next(errorResponse_1.default.badRequest("User email is missing."));
            }
            const blockeddUser = yield unblockUserUseCase(dependencies).execute(userEmail);
            if (!blockeddUser) {
                return next(errorResponse_1.default.notFound("User not found or unable to unblock user."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "User unblocked successfully."
                });
            }
        }
        catch (error) {
            console.error("Error unblocking user:", error);
            return next(errorResponse_1.default.internalError("Failed to unblock user."));
        }
    });
};
exports.unblockUserController = unblockUserController;
