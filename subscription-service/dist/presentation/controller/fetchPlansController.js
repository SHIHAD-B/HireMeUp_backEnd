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
exports.fetchPlansController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * fetchPlansController - Controller function to handle fetching and listing plans.
 *
 * This controller:
 * 1. Calls the `fetchPlansUseCase` to retrieve a list of plans from the database.
 *    - If no plans are found, returns a not found error.
 * 2. Returns a success response with the fetched plans upon successful retrieval.
 */
const fetchPlansController = (dependencies) => {
    const { useCases: { fetchPlansUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield fetchPlansUseCase(dependencies).execute();
            if (!users) {
                return next(errorResponse_1.default.notFound(" unable to list the plans."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: users,
                    message: "plans listed successfully."
                });
            }
        }
        catch (error) {
            console.error("Error listing plans:", error);
            return next(errorResponse_1.default.internalError("Failed to list plans."));
        }
    });
};
exports.fetchPlansController = fetchPlansController;
