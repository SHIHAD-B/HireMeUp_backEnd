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
exports.updateUserController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const editUserValidation_1 = require("../../utils/validation/editUserValidation");
const hashpassword_1 = require("../../utils/hash/hashpassword");
/**
 * updateUserController - Controller function to update user details.
 *
 * This controller:
 * 1. Deletes the `__v` field from the request body `data` if present.
 * 2. Validates the request body `data` to ensure required fields are present and valid using `editUserValidation`.
 *    - Returns a bad request error if validation fails.
 * 3. Hashes the password field in `data` if present using `hashPassword`.
 *    - Returns a forbidden error if hashing fails.
 * 4. Calls the `updateUserUseCase` to execute updating the user details based on the validated and hashed `value`.
 *    - Returns a forbidden error if updating the user details fails.
 * 5. Returns a success response with the updated user's details upon successful update.
 * 6. Handles and logs any caught errors during the execution.
 */
const updateUserController = (dependencies) => {
    const { useCases: { updateUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (data.__v) {
                delete data.__v;
            }
            if (!data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = editUserValidation_1.editUserValidation.validate(data);
            if (error) {
                return next(errorResponse_1.default.badRequest(error.message));
            }
            if (value.password) {
                const password = yield (0, hashpassword_1.hashPassword)(value.password);
                if (!password) {
                    return next(errorResponse_1.default.forbidden("Error occured in hashing password"));
                }
                else {
                    value.password = password;
                }
            }
            const editedUser = yield updateUserUseCase(dependencies).execute(value);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in editing the data of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: value,
                    message: "user details edited"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.updateUserController = updateUserController;
