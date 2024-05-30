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
exports.listEmployeeController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const listEmployeeController = (dependencies) => {
    const { useCases: { listEmployeeUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const listEmployee = yield listEmployeeUseCase(dependencies).execute();
            if (!listEmployee) {
                return next(errorResponse_1.default.notFound("failed to fetch the employee list"));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: listEmployee,
                    message: "employee fetched successfully."
                });
            }
        }
        catch (error) {
            console.error("Error fetching emmployee:", error);
            return next(errorResponse_1.default.internalError("Failed to fetch emmployee."));
        }
    });
};
exports.listEmployeeController = listEmployeeController;
