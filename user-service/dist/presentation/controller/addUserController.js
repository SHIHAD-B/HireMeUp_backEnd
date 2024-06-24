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
exports.addUserController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const hashpassword_1 = require("../../utils/hash/hashpassword");
const addUserValidation_1 = require("../../utils/validation/addUserValidation");
/**
 * addUserController - Controller function to handle adding a new user.
 *
 * This controller:
 * 1. Validates the incoming request body for required fields (`email` and `password`).
 *    - If validation fails (missing data), returns a bad request error.
 * 2. Hashes the user's password using the `hashPassword` utility function.
 *    - If hashing fails, returns a forbidden error.
 * 3. Calls the `addUserUseCase` to add the user with validated and hashed data.
 *    - If adding user fails (e.g., email or phone already exists), returns a conflict or forbidden error.
 * 4. Returns a success response with the added user object upon successful addition.
 */
const addUserController = (dependencies) => {
    const { useCases: { addUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data || !data.email || !data.password) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = addUserValidation_1.addUserValidation.validate(data);
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
            const addUser = yield addUserUseCase(dependencies).execute(value);
            if (addUser == false) {
                return next(errorResponse_1.default.conflict("email or phone already exists"));
            }
            else if (!addUser) {
                return next(errorResponse_1.default.forbidden("Error occured in adding the data of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: addUser,
                    message: "user added successfully"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.addUserController = addUserController;
