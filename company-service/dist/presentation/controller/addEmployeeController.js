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
exports.addEmployeeController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const addEmployeeValidation_1 = require("../../utils/validation/addEmployeeValidation");
/**
 * addEmployeeController - Handles the addition of an employee using the addEmployeeUseCase.
 *
 * This controller:
 * 1. Validates the incoming request body data using addEmployeeValidation.
 * 2. Returns a bad request error if validation fails, including all validation errors.
 * 3. Executes the addEmployeeUseCase to add a new employee based on the provided data.
 * 4. Returns a bad request error if the employee already exists.
 * 5. Returns an internal server error if adding the employee fails.
 * 6. Returns a success response with the added employee details upon successful addition.
 * 7. Logs any errors encountered during the process and passes them to the error handler middleware.
 */
const addEmployeeController = (dependencies) => {
    const { useCases: { addEmployeeUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data) {
                return next(errorResponse_1.default.badRequest("Employee data is missing."));
            }
            const { value, error } = addEmployeeValidation_1.addEmployeeValidation.validate(data, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message).join(", ");
                return next(errorResponse_1.default.badRequest(errorMessages));
            }
            const addEmployee = yield addEmployeeUseCase(dependencies).execute(value);
            if (addEmployee === false) {
                return next(errorResponse_1.default.badRequest("Employee already exists."));
            }
            else if (!addEmployee) {
                return next(errorResponse_1.default.internalError("Failed to add employee."));
            }
            return res.status(200).json({
                success: true,
                user: addEmployee,
                message: "Employee added successfully."
            });
        }
        catch (error) {
            console.error("Error adding employee:", error);
            return next(errorResponse_1.default.internalError("Failed to add employee."));
        }
    });
};
exports.addEmployeeController = addEmployeeController;
