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
exports.deleteJobController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * deleteJobController - Controller function to handle deleting a job using deleteJobUseCase.
 *
 * This controller:
 * 1. Extracts the job ID from the request body.
 *    - If ID is missing, returns a bad request error.
 * 2. Executes deleteJobUseCase to delete the job based on the ID.
 *    - If deletion fails or job is not found, returns a forbidden error.
 * 3. Returns a success response with the deleted job if deletion is successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */
const deleteJobController = (dependencies) => {
    const { useCases: { deleteJobUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            if (!id) {
                return next(errorResponse_1.default.badRequest("credential is missing"));
            }
            else {
                const job = yield deleteJobUseCase(dependencies).execute(id);
                if (!job) {
                    return next(errorResponse_1.default.forbidden("failed to delete job"));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job delete successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.deleteJobController = deleteJobController;
