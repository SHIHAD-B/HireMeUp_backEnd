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
exports.deleteUserController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const deleteUserController = (dependencies) => {
    const { useCases: { deleteUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userEmail = req.body.email;
            if (!userEmail) {
                return next(errorResponse_1.default.badRequest("User email is missing."));
            }
            const deletedUser = yield deleteUserUseCase(dependencies).execute(userEmail);
            if (!deletedUser) {
                return next(errorResponse_1.default.notFound("User not found or unable to delete user."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: deletedUser,
                    message: "User deleted successfully."
                });
            }
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return next(errorResponse_1.default.internalError("Failed to delete user."));
        }
    });
};
exports.deleteUserController = deleteUserController;
