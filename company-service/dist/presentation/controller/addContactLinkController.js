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
exports.addContactLinksController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const addContactLinksValidation_1 = require("../../utils/validation/addContactLinksValidation");
/**
 * addContactLinksController - Handles the addition of contact links for a user using addContactLinksUseCase.
 *
 * Responsibilities:
 * - Validates the incoming request body data using ContactLinkValidation.
 * - Returns a bad request error if validation fails, including all validation errors.
 * - Executes the addContactLinksUseCase to add contact links based on the provided data.
 * - Returns a not found error if the user is not found during the operation.
 * - Returns a not found error if adding the contact links fails for other reasons.
 * - Returns an internal server error if any unexpected error occurs.
 * - Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const addContactLinksController = (dependencies) => {
    const { useCases: { addContactLinksUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { value, error } = addContactLinksValidation_1.ContactLinkValidation.validate(data, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message).join(", ");
                return next(errorResponse_1.default.badRequest(errorMessages));
            }
            const updateLink = yield addContactLinksUseCase(dependencies).execute(data);
            if (updateLink == false) {
                return next(errorResponse_1.default.notFound("user not found"));
            }
            else if (!updateLink) {
                return next(errorResponse_1.default.notFound("failed to add the contact links"));
            }
            return res.status(200).json({
                success: true,
                user: updateLink,
                message: "contacts added successfully."
            });
        }
        catch (error) {
            console.error("Error adding conatact links:", error);
            return next(errorResponse_1.default.internalError("Failed to add contact links."));
        }
    });
};
exports.addContactLinksController = addContactLinksController;
