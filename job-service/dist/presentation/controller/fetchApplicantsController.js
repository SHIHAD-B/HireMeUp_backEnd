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
exports.fetchApplicantsController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const fetchApplicantsController = (dependencies) => {
    const { useCases: { fetchApplicantsUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (!id) {
                return next(errorResponse_1.default.badRequest("id is required..."));
            }
            const applicants = yield fetchApplicantsUseCase(dependencies).execute(id);
            if (!applicants) {
                return next(errorResponse_1.default.badRequest("failed to fetch applicants.."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: applicants,
                    message: "applicants fetched successfully..."
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.fetchApplicantsController = fetchApplicantsController;
