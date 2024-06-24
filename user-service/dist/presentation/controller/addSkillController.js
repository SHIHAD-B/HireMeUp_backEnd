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
exports.addSkillController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * addSkillController - Controller function to handle adding a skill for a user.
 *
 * This controller:
 * 1. Validates the incoming request body for required fields (`id` and `skill`).
 *    - If validation fails (missing data), returns a bad request error.
 * 2. Calls the `addSkillUseCase` to add the skill for the user identified by `id`.
 *    - If adding skill fails, returns a forbidden error.
 * 3. Returns a success response with the updated user object containing the added skill upon successful addition.
 */
const addSkillController = (dependencies) => {
    const { useCases: { addSkillUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas || !datas.id || !datas.skill) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { id, skill } = datas;
            const editedUser = yield addSkillUseCase(dependencies).execute(id, skill);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in adding skill  of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user skill added"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.addSkillController = addSkillController;
