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
exports.listAllMessageController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * listAllMessageController - Retrieves all messages associated with a particular room ID.
 *
 * This controller:
 * 1. Retrieves the room ID from the request query parameters.
 * 2. Validates if the room ID is provided.
 * 3. Executes the listAllMessageUseCase to fetch all messages for the provided room ID.
 * 4. Returns an error response if the room ID is missing or if fetching messages fails.
 * 5. Returns a success response with the fetched messages if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */
const listAllMessageController = (dependencies) => {
    const { useCases: { listAllMessageUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.query.id;
            if (!data) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const messages = yield listAllMessageUseCase(dependencies).execute(String(data));
            if (!messages) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            return res.status(200).send({
                success: true,
                user: messages,
                message: "message listed successfully"
            });
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.listAllMessageController = listAllMessageController;
