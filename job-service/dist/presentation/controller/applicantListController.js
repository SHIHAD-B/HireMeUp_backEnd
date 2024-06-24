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
exports.applicantListController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * applicantListController - Controller function to handle listing applicants using the listApplicantsUseCase.
 *
 * This controller:
 * 1. Executes the listApplicantsUseCase to retrieve a list of applicants.
 *    - If listing applicants fails, returns a bad request error.
 * 2. Returns a success response with the list of applicants if successful.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */
const applicantListController = (dependencies) => {
    const { useCases: { listApplicantsUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const applicants = yield listApplicantsUseCase(dependencies).execute();
            if (!applicants) {
                return next(errorResponse_1.default.badRequest("failed to list applicants.."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: applicants,
                    message: "applicants listed successfully..."
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.applicantListController = applicantListController;
