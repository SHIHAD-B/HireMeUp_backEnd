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
exports.deleteExperienceController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * deleteExperienceController - Controller function to handle deleting experience of a user.
 *
 * This controller:
 * 1. Validates the incoming request body for `id` (experience ID) and `userId`.
 *    - If validation fails (missing `id` or `userId`), returns a bad request error.
 * 2. Calls the `deleteExperienceUseCase` to perform the deletion operation.
 *    - If the operation fails (experience not found or unable to delete experience), returns a forbidden error.
 * 3. Returns a success response with the updated user object upon successful deletion.
 */
const deleteExperienceController = (dependencies) => {
    const { useCases: { deleteExperienceUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas || !datas.id || !datas.userId) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { userId, id } = datas;
            const editedUser = yield deleteExperienceUseCase(dependencies).execute(userId, id);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in deleting experience  of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user exprerience deleted"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.deleteExperienceController = deleteExperienceController;
