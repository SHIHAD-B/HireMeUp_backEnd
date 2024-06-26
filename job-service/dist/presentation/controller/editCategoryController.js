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
/**
 * editCategoryController - Controller function to handle editing a category using editCategoryUseCase.
 *
 * This controller:
 * 1. Validates the request body using editCategoryValidation.
 *    - If validation fails, returns a conflict error.
 * 2. Executes editCategoryUseCase to edit the category based on the validated data.
 *    - If the category already exists, returns a conflict error.
 *    - If editing fails for any reason, returns a conflict error.
 * 3. Returns a success response with the edited category if editing is successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */
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
