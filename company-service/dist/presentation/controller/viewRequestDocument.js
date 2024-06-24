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
exports.viewRequestDocumentController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * viewRequestDocumentController - Controller function to view a request document using the viewRequestDocumentUseCase.
 *
 * This controller:
 * 1. Retrieves the request document ID from the request body.
 * 2. Validates that the ID is provided; otherwise, returns a bad request error.
 * 3. Executes the viewRequestDocumentUseCase to fetch and view the request document based on the provided ID.
 *    - If the document is not found, returns a not found error.
 * 4. Returns a success response with a message indicating that the request document was viewed successfully.
 * 5. Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const viewRequestDocumentController = (dependencies) => {
    const { useCases: { viewRequestDocumentUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            const approveRequests = yield viewRequestDocumentUseCase(dependencies).execute(id);
            if (!approveRequests) {
                return next(errorResponse_1.default.notFound("failed to view the requests"));
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: "request Document viewed successfully."
                });
            }
        }
        catch (error) {
            console.error("Error viewing  request document:", error);
            return next(errorResponse_1.default.internalError("Failed to view request document."));
        }
    });
};
exports.viewRequestDocumentController = viewRequestDocumentController;
