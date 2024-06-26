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
exports.jobListController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * jobListController - Controller function to handle listing jobs using listJobsUseCase.
 *
 * This controller:
 * 1. Executes listJobsUseCase to retrieve a list of jobs.
 *    - If fetching fails or no jobs found, returns a bad request error.
 * 2. Returns a success response with the list of jobs if retrieval is successful.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */
const jobListController = (dependencies) => {
    const { useCases: { listJobsUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const job = yield listJobsUseCase(dependencies).execute();
            if (!job) {
                return next(errorResponse_1.default.badRequest("failed to list job.."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: job,
                    message: "job listed successfully..."
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.jobListController = jobListController;
