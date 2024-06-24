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
exports.editAdminController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const hashpassword_1 = require("../../utils/hash/hashpassword");
const editAdminValidation_1 = require("../../utils/validation/editAdminValidation");
/**
 * editAdminController - Controller function to handle editing an admin's details.
 *
 * This controller:
 * 1. Extracts and validates the incoming request body (`data`) using `editAdminValidation`.
 *    - Deletes the `__v` field from the `data`.
 *    - If `data` is missing or validation fails, returns a bad request error.
 * 2. Hashes the `password` field of `value` if present using `hashPassword`.
 *    - If hashing fails, returns a forbidden error.
 * 3. Calls the `editAdminUseCase` to execute the edit operation.
 *    - If the operation fails, returns a forbidden error.
 * 4. Returns a success response with the edited admin's details upon successful edit.
 */
const editAdminController = (dependencies) => {
    const { useCases: { editAdminUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            delete data.__v;
            if (!data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = editAdminValidation_1.editAdminValidation.validate(data);
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
            const editedUser = yield editAdminUseCase(dependencies).execute(value);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in editing the data of admin"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: value,
                    message: "admin details edited"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.editAdminController = editAdminController;
