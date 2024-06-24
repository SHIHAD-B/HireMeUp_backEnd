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
/**
 * sendMessageController - Sends a message using the sendMessageUseCase.
 *
 * This controller:
 * 1. Retrieves message data from the request body.
 * 2. Validates if message data is provided.
 * 3. Executes the sendMessageUseCase to send the message using the provided data.
 * 4. Returns an error response if message data is missing or if sending the message fails.
 * 5. Returns a success response with the sent message details if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */
const sendMessageController = (dependencies) => {
    const { useCases: { sendMessageUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
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
