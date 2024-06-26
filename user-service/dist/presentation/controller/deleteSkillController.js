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
exports.deleteSkillController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * deleteSkillController - Controller function to handle deleting a skill of a user.
 *
 * This controller:
 * 1. Validates the incoming request body for `id` (user ID) and `skill` (skill to delete).
 *    - If validation fails (missing `id` or `skill`), returns a bad request error.
 * 2. Calls the `deleteSkillUseCase` to perform the deletion operation.
 *    - If the operation fails (skill not found or unable to delete skill), returns a forbidden error.
 * 3. Returns a success response with the updated user object upon successful deletion.
 */
const deleteSkillController = (dependencies) => {
    const { useCases: { deleteSkillUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas || !datas.id || !datas.skill) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { id, skill } = datas;
            const editedUser = yield deleteSkillUseCase(dependencies).execute(id, skill);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in deleting akill of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user skill deleted"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.deleteSkillController = deleteSkillController;
