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
exports.editAdCompanyController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const editAdCompany_1 = require("../../utils/validation/editAdCompany");
const hashpassword_1 = require("../../utils/hash/hashpassword");
/**
 * editAdCompanyController - Controller function to edit an advertising company's details.
 *
 * Steps:
 * 1. Retrieves company data from the request body.
 * 2. Validates that company data is provided; otherwise, returns a bad request error.
 * 3. Removes sensitive fields from the company data to avoid unintended updates.
 * 4. Validates the edited company data format using editCompanyValidation.
 *    - If validation fails, returns a bad request error with the validation message.
 * 5. If a new password is provided in the data, hashes the password using hashPassword utility function.
 *    - Returns a forbidden error if hashing fails; otherwise, updates the password in the data.
 * 6. Executes the editCompanyUseCase to update the company details based on the edited data.
 * 7. Returns a not found error if the company is not found or unable to be edited.
 * 8. Returns a success response with the updated company's information upon successful edit.
 * 9. Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const editAdCompanyController = (dependencies) => {
    const { useCases: { editCompanyUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data) {
                return next(errorResponse_1.default.badRequest("Company data is missing."));
            }
            delete data.status;
            delete data.tech_stack;
            delete data.images;
            delete data.approval;
            delete data.benefits;
            delete data.location;
            delete data.createdAt;
            delete data.__v;
            delete data.deleted;
            const { value, error } = editAdCompany_1.editCompanyValidation.validate(data, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message).join(", ");
                return next(errorResponse_1.default.badRequest(errorMessages));
            }
            if (value.password) {
                const password = yield (0, hashpassword_1.hashPassword)(value.password);
                if (!password) {
                    return next(errorResponse_1.default.forbidden("Error occured in hashing password"));
                }
                else {
                    value.password = password;
                }
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
exports.editAdCompanyController = editAdCompanyController;
