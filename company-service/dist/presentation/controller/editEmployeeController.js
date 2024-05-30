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
exports.editEmployeeController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const editEmployeeValidation_1 = require("../../utils/validation/editEmployeeValidation");
const editEmployeeController = (dependencies) => {
    const { useCases: { editEmployeeUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data) {
                return next(errorResponse_1.default.badRequest("employee data is missing."));
            }
            delete data.deleted;
            delete data.createdAt;
            delete data.profile;
            delete data.__v;
            const { value, error } = editEmployeeValidation_1.editEmployeeValidation.validate(data, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message).join(", ");
                return next(errorResponse_1.default.badRequest(errorMessages));
            }
            const editEmployee = yield editEmployeeUseCase(dependencies).execute(value);
            if (editEmployee === false) {
                return next(errorResponse_1.default.conflict("employee details are upToDate"));
            }
            else if (!editEmployee) {
                return next(errorResponse_1.default.notFound("employee not found or unable to edit employee."));
            }
            return res.status(200).json({
                success: true,
                user: editEmployee,
                message: "Employee edited successfully."
            });
        }
        catch (error) {
            console.error("Error editing employee:", error);
            return next(errorResponse_1.default.internalError("Failed to edit employee."));
        }
    });
};
exports.editEmployeeController = editEmployeeController;
