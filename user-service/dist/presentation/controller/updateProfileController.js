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
exports.updateProfileController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const updateProfileValidation_1 = require("../../utils/validation/updateProfileValidation");
/**
 * updateProfileController - Controller function to update user profile data.
 *
 * This controller:
 * 1. Validates the request body `datas` to ensure required fields are present and valid using `updateProfileValidation`.
 *    - Returns a bad request error if validation fails.
 * 2. Calls the `updateProfielUseCase` to execute updating the user profile based on the provided `id`, `data`, and `field`.
 *    - Returns a forbidden error if updating the user profile fails.
 * 3. Returns a success response with the updated user's details upon successful profile update.
 * 4. Handles and logs any caught errors during the execution.
 */
const updateProfileController = (dependencies) => {
    const { useCases: { updateProfielUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = updateProfileValidation_1.updateProfileValidation.validate(datas);
            if (error) {
                return next(errorResponse_1.default.badRequest(error.message));
            }
            const { id, data, field } = datas;
            const editedUser = yield updateProfielUseCase(dependencies).execute(id, data, field);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in editing the data of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user profile edited"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.updateProfileController = updateProfileController;
