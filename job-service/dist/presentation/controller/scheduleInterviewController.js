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
exports.scheduleInterviewController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const scheduleValidation_1 = require("../../utils/validation/scheduleValidation");
/**
 * scheduleInterviewController - Controller function to handle scheduling interviews using scheduleInterviewUseCase.
 *
 * This controller:
 * 1. Checks if request body exists, if not, returns a bad request error.
 * 2. Validates the request body using scheduleValidation.
 *    - If validation fails, returns a conflict error with details.
 * 3. Executes scheduleInterviewUseCase to schedule the interview.
 *    - If scheduling fails due to candidate rejection, returns a bad request error.
 *    - If scheduling fails due to unavailability of slots, returns a bad request error.
 *    - If scheduling succeeds, returns a success response with the scheduled interview details.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */
const scheduleInterviewController = (dependencies) => {
    const { useCases: { scheduleInterviewUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body) {
                return next(errorResponse_1.default.badRequest("required data is missing..."));
            }
            const { value, error } = scheduleValidation_1.scheduleValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const schedule = yield scheduleInterviewUseCase(dependencies).execute(value);
                if (schedule == false) {
                    return next(errorResponse_1.default.badRequest("can't schedule and interview for rejected candidates.."));
                }
                else if (schedule == null) {
                    return next(errorResponse_1.default.badRequest("slot is not available ! kindly re-schdule to another time.."));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: schedule,
                        message: "schdule  added successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.scheduleInterviewController = scheduleInterviewController;
