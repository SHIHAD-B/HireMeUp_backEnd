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
exports.listAdminController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * listAdminController - Controller function to list all admins.
 *
 * This controller:
 * 1. Calls the `listAdminUseCase` to execute fetching the list of admins.
 *    - Returns a not found error if no admins are found or unable to list.
 *    - Returns a success response with the list of admins if available.
 * 2. Handles and logs any caught errors during the execution.
 */
const listAdminController = (dependencies) => {
    const { useCases: { listAdminUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield listAdminUseCase(dependencies).execute();
            if (!admin) {
                return next(errorResponse_1.default.notFound(" unable to list the admin."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: admin,
                    message: "Admin listed successfully."
                });
            }
        }
        catch (error) {
            console.error("Error listing admin:", error);
            return next(errorResponse_1.default.internalError("Failed to list admin."));
        }
    });
};
exports.listAdminController = listAdminController;
