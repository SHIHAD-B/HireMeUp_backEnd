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
exports.deleteApplicantController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const deleteApplicantController = (dependencies) => {
    const { useCases: { deleteApplicantsUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            if (!id) {
                return next(errorResponse_1.default.badRequest("credential is missing"));
            }
            else {
                const applicant = yield deleteApplicantsUseCase(dependencies).execute(id);
                if (!applicant) {
                    return next(errorResponse_1.default.forbidden("failed to delete applicant"));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: applicant,
                        message: "applicant delete successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.deleteApplicantController = deleteApplicantController;
