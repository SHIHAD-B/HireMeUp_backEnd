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
exports.addCategoryController = void 0;
const addCategoryValidation_1 = require("../../utils/validation/addCategoryValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * addCategoryController - Controller function to handle adding categories using the addCategoryUseCase.
 *
 * This controller:
 * 1. Validates the incoming request body using addCategoryValidation.
 *    - If validation fails, returns a conflict error with the validation message.
 * 2. Executes the addCategoryUseCase to add the category based on the validated data.
 *    - If the category already exists, returns a conflict error.
 * 3. Returns a success response with the added category data if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */
const addCategoryController = (dependencies) => {
    const { useCases: { addCategoryUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = addCategoryValidation_1.addCategoryValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const category = yield addCategoryUseCase(dependencies).execute(value);
                if (!category) {
                    return next(errorResponse_1.default.conflict("already Exists"));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: category,
                        message: "category added successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.addCategoryController = addCategoryController;
