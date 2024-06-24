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
exports.deleteEmployeeController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * deleteEmployeeController - Controller function to delete an employee.
 *
 * Steps:
 * 1. Retrieves the employee ID from the request body.
 * 2. Validates that the employee ID is provided; otherwise, returns a bad request error.
 * 3. Executes the deleteEmployeeUseCase to delete the employee based on the provided ID.
 * 4. Returns a not found error if the employee is not found or unable to be deleted.
 * 5. Returns a success response with the deleted employee's information upon successful deletion.
 * 6. Logs any errors encountered during the process and passes them to the error handler middleware.
 *
 */
const deleteEmployeeController = (dependencies) => {
    const { useCases: { deleteEmployeeUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const employeeId = req.body.id;
            if (!employeeId) {
                return next(errorResponse_1.default.badRequest("Employee id is missing."));
            }
            const deletededdUser = yield deleteEmployeeUseCase(dependencies).execute(employeeId);
            if (!deletededdUser) {
                return next(errorResponse_1.default.notFound("Employee not found or unable to delete Employee."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: deletededdUser,
                    message: "Employee deleted successfully."
                });
            }
        }
        catch (error) {
            console.error("Error deleting Employee:", error);
            return next(errorResponse_1.default.internalError("Failed to delete Employee."));
        }
    });
};
exports.deleteEmployeeController = deleteEmployeeController;
