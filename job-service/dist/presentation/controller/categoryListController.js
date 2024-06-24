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
exports.categoryListController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * categoryListController - Controller function to handle listing categories using the listCategoryUseCase.
 *
 * This controller:
 * 1. Executes the listCategoryUseCase to retrieve a list of categories.
 *    - If listing categories fails, returns a bad request error.
 * 2. Returns a success response with the list of categories if successful.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */
const categoryListController = (dependencies) => {
    const { useCases: { listCategoryUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield listCategoryUseCase(dependencies).execute();
            if (!category) {
                return next(errorResponse_1.default.badRequest("failed to list category.."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: category,
                    message: "category listed successfully..."
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.categoryListController = categoryListController;
