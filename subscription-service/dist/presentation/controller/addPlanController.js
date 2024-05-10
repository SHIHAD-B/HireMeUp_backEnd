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
exports.addPlansController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const planValidation_1 = require("../../utils/validation/planValidation");
const addPlansController = (dependencies) => {
    const { useCases: { addPlansUseCase, PlanExistsUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data, "data in the back end of add plan");
            const { error, value } = planValidation_1.addPlanValidation.validate(data);
            if (error) {
                return next(errorResponse_1.default.badRequest(String(error)));
            }
            const exist = yield PlanExistsUseCase(dependencies).execute(value.name);
            if (exist) {
                return next(errorResponse_1.default.conflict("plan already exists"));
            }
            const users = yield addPlansUseCase(dependencies).execute(value);
            if (!users) {
                return next(errorResponse_1.default.notFound(" unable to add the plans."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: users,
                    message: "plans added successfully."
                });
            }
        }
        catch (error) {
            console.error("Error adding plans:", error);
            return next(errorResponse_1.default.internalError("Failed to add plans."));
        }
    });
};
exports.addPlansController = addPlansController;
