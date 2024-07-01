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
exports.createRoomController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * createRoomController - Handles the creation of a chat room between users.
 *
 * This controller:
 * 1. Receives data from the request body containing sender and receiver information.
 * 2. Validates if the required data (sender and receiver) are present.
 * 3. Executes the createRoomUseCase to create a room with the provided sender and receiver.
 * 4. Returns an error response if the required data is missing or if the room creation fails.
 * 5. Returns a success response with the created room details if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */
const createRoomController = (dependencies) => {
    const { useCases: { createRoomUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data || !data.sender || !data.receiver) {
                return next(errorResponse_1.default.badRequest("data is required."));
            }
            const sendMessage = yield createRoomUseCase(dependencies).execute(data);
            if (!sendMessage) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            return res.status(200).send({
                success: true,
                user: sendMessage,
                message: "room created successfully"
            });
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.createRoomController = createRoomController;
