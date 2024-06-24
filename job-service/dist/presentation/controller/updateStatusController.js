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
exports.updateStatusController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * updateStatusController - Controller function to handle updating applicant status using updateStatusUseCase.
 *
 * This controller:
 * 1. Checks if status and id are present in the request body, if not, returns a conflict error.
 * 2. Executes updateStatusUseCase to update the status of the applicant.
 *    - If updating fails, returns a conflict error with details.
 *    - If updating succeeds, returns a success response with the updated applicant details.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */
const updateStatusController = (dependencies) => {
    const { useCases: { updateStatusUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eData = req.body;
            if (!eData.status || !eData.id) {
                return next(errorResponse_1.default.conflict("required data is missing..."));
            }
            else {
                const applicant = yield updateStatusUseCase(dependencies).execute(eData.id, eData.status);
                if (!applicant) {
                    return next(errorResponse_1.default.conflict("failed to update status"));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: applicant,
                        message: "status updated successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.updateStatusController = updateStatusController;
