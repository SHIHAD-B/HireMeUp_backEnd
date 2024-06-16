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
