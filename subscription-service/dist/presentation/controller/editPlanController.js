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
exports.editPlanController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const editPlanValidation_1 = require("../../utils/validation/editPlanValidation");
/**
 * editPlanController - Controller function to handle editing details of a plan.
 *
 * This controller:
 * 1. Validates the incoming request body using `editPlanValidation`.
 *    - If validation fails, returns a bad request error with the validation message.
 * 2. Deletes non-editable fields (`deleted`, `editedAt`, `createdAt`, `__v`) from the `data` object.
 * 3. Calls the `editPlansUseCase` to update the plan details with the validated `value`.
 *    - If a plan with the same details already exists, returns a conflict error.
 *    - If editing fails for any other reason, returns a forbidden error.
 * 4. Returns a success response with the edited plan details upon successful editing.
 */
const editPlanController = (dependencies) => {
    const { useCases: { editPlansUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(req.body, "body in subscription");
            if (!data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            delete data.deleted;
            delete data.editedAt;
            delete data.createdAt;
            delete data.__v;
            const { value, error } = editPlanValidation_1.editPlanValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.badRequest(error.message));
            }
            const editedPlan = yield editPlansUseCase(dependencies).execute(value);
            if (editedPlan == false) {
                return next(errorResponse_1.default.conflict("plan already exist"));
            }
            else if (!editedPlan) {
                return next(errorResponse_1.default.forbidden("Error occured in editing the data of plan"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: value,
                    message: "plan details edited"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.editPlanController = editPlanController;
