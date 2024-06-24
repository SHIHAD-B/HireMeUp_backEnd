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
/**
 * fetchUserController - Controller function to fetch details of a user.
 *
 * This controller:
 * 1. Retrieves the `email` from the `req.user` object (decoded JWT payload).
 *    - Returns a bad request error if `email` is missing from `req.user`.
 * 2. Calls the `fetchUserUseCase` to execute fetching the user details using the `email`.
 *    - Returns a not found error if user is not found or unable to fetch.
 *    - Returns a success response with the fetched user details if not blocked or deleted.
 *    - Returns a response indicating user is blocked or deleted if `user.blocked` or `user.deleted` is true.
 * 3. Handles and logs any caught errors during the execution.
 */
const fetchUserController = (dependencies) => {
    const { useCases: { fetchUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.user || {};
            if (!email) {
                return next(errorResponse_1.default.badRequest("User email is missing.....(controller)"));
            }
            const user = yield fetchUserUseCase(dependencies).execute(email);
            if (!user) {
                return next(errorResponse_1.default.notFound("User not found or unable to fetch user."));
            }
            else if (user.blocked == true || user.deleted == true) {
                return res.status(200).json({
                    success: false,
                    user: null,
                    message: "user is blocked or deleted"
                });
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
