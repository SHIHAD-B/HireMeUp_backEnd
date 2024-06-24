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
exports.fetchScheduleController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * fetchScheduleController - Controller function to handle fetching a schedule by ID using fetchScheduleUseCase.
 *
 * This controller:
 * 1. Validates the ID parameter to ensure it matches the expected format.
 *    - Uses isValidObjectId function to check if the ID is a valid ObjectId.
 *    - If ID is invalid, returns a bad request error.
 * 2. Executes fetchScheduleUseCase to retrieve the schedule based on the validated ID.
 *    - If fetching fails, returns a bad request error.
 * 3. Returns a success response with the fetched schedule if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */
const fetchScheduleController = (dependencies) => {
    const { useCases: { fetchScheduleUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            function isValidObjectId(id) {
                const objectIdPattern = /^[0-9a-fA-F]{24}$/;
                return objectIdPattern.test(id);
            }
            if (!isValidObjectId(id)) {
                return next(errorResponse_1.default.badRequest("invalid  id..."));
            }
            const schedule = yield fetchScheduleUseCase(dependencies).execute(id);
            if (!schedule) {
                return next(errorResponse_1.default.badRequest("failed to fetch schedule.."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: schedule,
                    message: "schedule fetched successfully..."
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.fetchScheduleController = fetchScheduleController;
