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
exports.addExperienceController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const addExperinceValidation_1 = require("../../utils/validation/addExperinceValidation");
/**
 * addExperienceController - Controller function to handle adding experience details for a user.
 *
 * This controller:
 * 1. Validates the incoming request body for required fields (`id` and `data`).
 *    - If validation fails, returns a bad request error.
 * 2. Validates the experience data using `experienceValidation`.
 *    - If validation fails, returns a bad request error with the validation message.
 * 3. Calls the `addExperienceUseCase` to add experience details for the user.
 *    - If adding experience fails, returns a forbidden error.
 * 4. Returns a success response with the updated user object containing experience details upon successful addition.
 */
const addExperienceController = (dependencies) => {
    const { useCases: { addExperienceUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas || !datas.id || !datas.data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = addExperinceValidation_1.experienceValidation.validate(datas.data);
            if (error) {
                return next(errorResponse_1.default.badRequest(error.message));
            }
            const { id, data } = datas;
            const editedUser = yield addExperienceUseCase(dependencies).execute(id, data);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in adding experience  of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user exprerience added"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.addExperienceController = addExperienceController;
