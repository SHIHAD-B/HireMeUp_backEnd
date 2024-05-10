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
exports.listCompanyController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const listCompanyController = (dependencies) => {
    const { useCases: { listCompanyUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const listRequests = yield listCompanyUseCase(dependencies).execute();
            if (!listRequests) {
                return next(errorResponse_1.default.notFound("failed to fetch the company list"));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: listRequests,
                    message: "company fetched successfully."
                });
            }
        }
        catch (error) {
            console.error("Error fetching company:", error);
            return next(errorResponse_1.default.internalError("Failed to fetch company."));
        }
    });
};
exports.listCompanyController = listCompanyController;
