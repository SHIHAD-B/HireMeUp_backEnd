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
exports.addApplicantController = void 0;
const addApplicantsValidation_1 = require("../../utils/validation/addApplicantsValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const addApplicantController = (dependencies) => {
    const { useCases: { addApplicantsUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = addApplicantsValidation_1.addApplicantsValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const applicant = yield addApplicantsUseCase(dependencies).execute(value);
                if (!applicant) {
                    return next(errorResponse_1.default.badRequest("already applied.."));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: applicant,
                        message: "applicant added successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.addApplicantController = addApplicantController;
