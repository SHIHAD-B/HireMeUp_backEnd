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
exports.addCompanyController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const sentAck_1 = require("../../utils/otp/sentAck");
const addCompanyValidation_1 = require("../../utils/validation/addCompanyValidation");
const addCompanyController = (dependencies) => {
    const { useCases: { addCompanyUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { value, error } = addCompanyValidation_1.addCompanyValidation.validate(data, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message).join(", ");
                return next(errorResponse_1.default.badRequest(errorMessages));
            }
            const approveRequests = yield addCompanyUseCase(dependencies).execute(data);
            if (!approveRequests) {
                return next(errorResponse_1.default.notFound("failed to add the company"));
            }
            else {
                (0, sentAck_1.sendApprovalNotification)(data.email);
                return res.status(200).json({
                    success: true,
                    user: approveRequests,
                    message: "company added successfully."
                });
            }
        }
        catch (error) {
            console.error("Error adding company:", error);
            return next(errorResponse_1.default.internalError("Failed to add company."));
        }
    });
};
exports.addCompanyController = addCompanyController;
