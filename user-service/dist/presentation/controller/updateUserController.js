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
exports.editUserController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const editUserValidation_1 = require("../../utils/validation/editUserValidation");
const hashpassword_1 = require("../../utils/hash/hashpassword");
const editUserController = (dependencies) => {
    const { useCases: { updateUserUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = editUserValidation_1.editUserValidation.validate(req.body);
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
exports.editUserController = editUserController;
