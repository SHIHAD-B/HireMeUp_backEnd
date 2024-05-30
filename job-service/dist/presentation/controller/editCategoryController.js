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
exports.editCategoryController = void 0;
const editCategoryValidation_1 = require("../../utils/validation/editCategoryValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const editCategoryController = (dependencies) => {
    const { useCases: { editCategoryUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = editCategoryValidation_1.editCategoryValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const category = yield editCategoryUseCase(dependencies).execute(value);
                if (category == false) {
                    return next(errorResponse_1.default.conflict("Category already exists"));
                }
                else if (!category) {
                    return next(errorResponse_1.default.conflict("Failed to edit category"));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: category,
                        message: "category edited successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.editCategoryController = editCategoryController;
