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
exports.rejectRequestController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const sentRej_1 = require("../../utils/otp/sentRej");
/**
 * rejectRequestController - Controller function to reject requests using the rejectRequestUseCase.
 *
 * This controller:
 * 1. Retrieves request data from the request body.
 * 2. Executes the rejectRequestUseCase to handle the rejection based on the provided data.
 * 3. Returns a not found error if the rejection operation fails.
 * 4. Sends a rejection notification via sendRejectionNotification utility function.
 * 5. Returns a success response with details of the rejected requests upon successful rejection.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const rejectRequestController = (dependencies) => {
    const { useCases: { rejectRequestUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const approveRequests = yield rejectRequestUseCase(dependencies).execute(data);
            if (!approveRequests) {
                return next(errorResponse_1.default.notFound("failed to reject the requests"));
            }
            else {
                (0, sentRej_1.sendRejectionNotification)(data.email);
                return res.status(200).json({
                    success: true,
                    user: approveRequests,
                    message: "requests rejected successfully."
                });
            }
        }
        catch (error) {
            console.error("Error rejecting requests:", error);
            return next(errorResponse_1.default.internalError("Failed to reject requests."));
        }
    });
};
exports.rejectRequestController = rejectRequestController;
