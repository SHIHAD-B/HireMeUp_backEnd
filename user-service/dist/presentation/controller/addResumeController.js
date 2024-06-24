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
exports.addResumeController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * addResumeController - Controller function to handle adding resume details for a user.
 *
 * This controller:
 * 1. Validates the incoming request body for required fields (`id` and `resume`) and ensures they are not empty strings.
 *    - If validation fails, returns a bad request error.
 * 2. Calls the `addResumeUseCase` to add resume details for the user.
 *    - If adding resume fails, returns a forbidden error.
 * 3. Returns a success response with the updated user object containing resume details upon successful addition.
 */
const addResumeController = (dependencies) => {
    const { useCases: { addResumeUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas || !datas.id || !datas.resume || datas.id.trim() == "" || datas.resume.trim() == "") {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { id, resume } = datas;
            const editedUser = yield addResumeUseCase(dependencies).execute(id, resume);
            if (!editedUser) {
                return next(errorResponse_1.default.forbidden("Error occured in adding resume  of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user rewume added"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.addResumeController = addResumeController;
