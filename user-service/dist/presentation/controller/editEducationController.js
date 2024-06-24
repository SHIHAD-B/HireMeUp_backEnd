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
exports.editEducationController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const educationValidation_1 = require("../../utils/validation/educationValidation");
/**
 * editEducationController - Controller function to handle editing a user's education details.
 *
 * This controller:
 * 1. Extracts and validates the incoming request body (`datas`).
 *    - Checks if `datas` contains `id` and `data`.
 *    - Validates `datas.data` using `educationValidation`.
 *    - Returns a bad request error if `datas` or its fields are missing, or validation fails.
 * 2. Calls the `editEducationUseCase` to execute the edit operation using `id` and `data`.
 *    - If the operation fails, returns a forbidden error.
 * 3. Returns a success response with the edited user's education details upon successful edit.
 */
const editEducationController = (dependencies) => {
    const { useCases: { editEducationUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas || !datas.id || !datas.data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = educationValidation_1.educationValidation.validate(datas.data);
            if (error) {
                return next(errorResponse_1.default.badRequest(error.message));
            }
            const { id, data } = datas;
            const editedUser = yield editEducationUseCase(dependencies).execute(id, data);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in editng education  of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user education edited"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.editEducationController = editEducationController;
