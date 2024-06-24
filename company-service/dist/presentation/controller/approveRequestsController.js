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
exports.approveRequestController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const sentAck_1 = require("../../utils/otp/sentAck");
/**
 * approveRequestController - Handles the approval of requests using the approveRequestUseCase.
 *
 * This controller:
 * 1. Executes the approveRequestUseCase to approve requests based on the provided data.
 * 2. Returns a not found error if no requests are found or if approving the requests fails.
 * 3. Sends an approval notification via sendApprovalNotification.
 * 4. Returns a success response with the approved requests details upon successful approval.
 * 5. Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const approveRequestController = (dependencies) => {
    const { useCases: { approveRequestUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const approveRequests = yield approveRequestUseCase(dependencies).execute(data);
            if (!approveRequests) {
                return next(errorResponse_1.default.notFound("failed to approve the requests"));
            }
            else {
                (0, sentAck_1.sendApprovalNotification)(data.email);
                return res.status(200).json({
                    success: true,
                    user: approveRequests,
                    message: "requests approved successfully."
                });
            }
        }
        catch (error) {
            console.error("Error approving requests:", error);
            return next(errorResponse_1.default.internalError("Failed to approve requests."));
        }
    });
};
exports.approveRequestController = approveRequestController;
