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
exports.editCompanyController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const editCompanyValidation_1 = require("../../utils/validation/editCompanyValidation");
/**
 * editCompanyController - Controller function to edit a company's details.
 *
 * Steps:
 * 1. Retrieves company data from the request body.
 * 2. Validates that company data is provided; otherwise, returns a bad request error.
 * 3. Removes sensitive fields from the company data to avoid unintended updates.
 * 4. Validates the edited company data format using setProfileOneValidation.
 *    - If validation fails, returns a bad request error with the validation message.
 * 5. Executes the editCompanyUseCase to update the company details based on the edited data.
 * 6. Returns a not found error if the company is not found or unable to be edited.
 * 7. Returns a success response with the updated company's information upon successful edit.
 * 8. Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const editCompanyController = (dependencies) => {
    const { useCases: { editCompanyUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data) {
                return next(errorResponse_1.default.badRequest("Company data is missing."));
            }
            delete data.status;
            delete data.deleted;
            delete data.images;
            delete data.approval;
            delete data.benefits;
            delete data.createdAt;
            delete data.profile;
            delete data.__v;
            const { value, error } = editCompanyValidation_1.setProfileOneValidation.validate(data, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message).join(", ");
                return next(errorResponse_1.default.badRequest(errorMessages));
            }
            const editCompany = yield editCompanyUseCase(dependencies).execute(value);
            if (!editCompany) {
                return next(errorResponse_1.default.notFound("Company not found or unable to edit company."));
            }
            return res.status(200).json({
                success: true,
                user: editCompany,
                message: "Company edited successfully."
            });
        }
        catch (error) {
            console.error("Error editing company:", error);
            return next(errorResponse_1.default.internalError("Failed to edit company."));
        }
    });
};
exports.editCompanyController = editCompanyController;
