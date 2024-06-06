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
exports.sendMessageController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const sendMessageController = (dependencies) => {
    const { useCases: { sendMessageUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(req.body, "rec body...");
            if (!data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const sendMessage = yield sendMessageUseCase(dependencies).execute(data);
            if (!sendMessage) {
                return next(errorResponse_1.default.badRequest("data is required...."));
            }
            return res.status(200).send({
                success: true,
                user: sendMessage,
                message: "message send successfully"
            });
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.sendMessageController = sendMessageController;
