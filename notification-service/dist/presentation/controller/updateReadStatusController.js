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
exports.updateReadStatusController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * updateReadStatusController - Controller function to handle updating read status of notifications for a user.
 *
 * This controller:
 * 1. Retrieves the notification id from request body.
 *    - If id is missing, returns a bad request error.
 * 2. Executes updateReadStatusUseCase to update the read status for the specified notification id.
 *    - If updating read status fails, returns a forbidden error with details.
 *    - If updating read status succeeds, returns a success response indicating the status update.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */
const updateReadStatusController = (dependencies) => {
    const { useCases: { updateReadStatusUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            if (!id) {
                return next(errorResponse_1.default.badRequest("id is required"));
            }
            const updateread = yield updateReadStatusUseCase(dependencies).execute(String(id));
            if (!updateread) {
                return next(errorResponse_1.default.forbidden("Error occured in updating read status  of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: updateread,
                    message: "read status is   updated"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.updateReadStatusController = updateReadStatusController;
