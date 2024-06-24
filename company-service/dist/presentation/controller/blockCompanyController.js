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
exports.blockCompanyController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * blockCompanyController - Handles the blocking of a company using the blockCompanyUseCase.
 *
 * This controller:
 * 1. Retrieves the company email from the request body.
 * 2. Validates that the company email is provided; otherwise, returns a bad request error.
 * 3. Executes the blockCompanyUseCase to block the company based on the provided email.
 * 4. Returns a not found error if the company is not found or unable to be blocked.
 * 5. Returns a success response with the blocked company details upon successful blocking.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const blockCompanyController = (dependencies) => {
    const { useCases: { blockCompanyUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userEmail = req.body.email;
            if (!userEmail) {
                return next(errorResponse_1.default.badRequest("company email is missing."));
            }
            const blockeddUser = yield blockCompanyUseCase(dependencies).execute(userEmail);
            if (!blockeddUser) {
                return next(errorResponse_1.default.notFound("company not found or unable to block company."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: blockeddUser,
                    message: "company blocked successfully."
                });
            }
        }
        catch (error) {
            console.error("Error blocking compnay:", error);
            return next(errorResponse_1.default.internalError("Failed to block company."));
        }
    });
};
exports.blockCompanyController = blockCompanyController;
