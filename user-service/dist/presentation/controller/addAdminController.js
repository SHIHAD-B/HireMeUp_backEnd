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
exports.addAdminController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const hashpassword_1 = require("../../utils/hash/hashpassword");
const addAdminValidation_1 = require("../../utils/validation/addAdminValidation");
/**
 * addAdminController - Controller function to handle adding an admin user.
 *
 * This controller:
 * 1. Validates the incoming request body for required fields (`email` and `password`).
 *    - If validation fails, returns a bad request error.
 * 2. Validates the admin data using `addAdminValidation`.
 *    - If validation fails, returns a bad request error with the validation message.
 * 3. Hashes the admin's password using `hashPassword` utility function.
 *    - If hashing fails, returns a forbidden error.
 * 4. Calls the `addAdminUseCase` to add the admin user with hashed password.
 *    - If the admin already exists, returns a conflict error.
 *    - If adding admin fails, returns a forbidden error.
 * 5. Returns a success response with the added admin user object upon successful addition.
 */
const addAdminController = (dependencies) => {
    const { useCases: { addAdminUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data || !data.email || !data.password) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = addAdminValidation_1.addAdminValidation.validate(data);
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
            const addAdmin = yield addAdminUseCase(dependencies).execute(value);
            if (addAdmin == false) {
                return next(errorResponse_1.default.conflict("admin already exists"));
            }
            else if (!addAdmin) {
                return next(errorResponse_1.default.forbidden("Error occured in adding the data of admin"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: addAdmin,
                    message: "admin added successfully"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.addAdminController = addAdminController;
