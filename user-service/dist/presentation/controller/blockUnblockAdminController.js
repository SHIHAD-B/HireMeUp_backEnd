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
exports.blockUnblockAdminController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * blockUnblockAdminController - Controller function to handle blocking/unblocking an admin user.
 *
 * This controller:
 * 1. Validates the incoming request body for the `email` of the admin user.
 *    - If validation fails (missing `email`), returns a bad request error.
 * 2. Calls the `blockUnblockAdminUserUseCase` to perform the blocking/unblocking operation.
 *    - If the operation fails (admin not found or unable to perform action), returns a not found or internal error.
 * 3. Returns a success response with the blocked/unblocked admin user object upon successful operation.
 */
const blockUnblockAdminController = (dependencies) => {
    const { useCases: { blockUnblockAdminUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userEmail = req.body.email;
            if (!userEmail) {
                return next(errorResponse_1.default.badRequest("admin ID is missing."));
            }
            const blockeddUser = yield blockUnblockAdminUserUseCase(dependencies).execute(userEmail);
            if (!blockeddUser) {
                return next(errorResponse_1.default.notFound("admin not found or unable to block/unblock admin."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "admin blocked/unblocked successfully."
                });
            }
        }
        catch (error) {
            console.error("Error blocking user:", error);
            return next(errorResponse_1.default.internalError("Failed to block user."));
        }
    });
};
exports.blockUnblockAdminController = blockUnblockAdminController;
