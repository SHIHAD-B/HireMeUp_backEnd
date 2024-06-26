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
exports.addNotificationController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const addNotificationValidation_1 = require("../../utils/error/validation/addNotificationValidation");
/**
 * addNotificationController - Controller function to handle adding notifications using addNotificationUseCase.
 *
 * This controller:
 * 1. Checks if request body contains required data; if not, returns a bad request error.
 * 2. Validates the structure of the notification data using addNotificationValidation.
 *    - If validation fails, returns a bad request error with details.
 * 3. Executes addNotificationUseCase to add the notification.
 *    - If adding notification fails, returns a forbidden error with details.
 *    - If adding notification succeeds, returns a success response with the added notification details.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */
const addNotificationController = (dependencies) => {
    const { useCases: { addNotificationUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            if (!datas) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { value, error } = addNotificationValidation_1.addNotificationValidation.validate(datas.data);
            if (error) {
                return next(errorResponse_1.default.badRequest(error.message));
            }
            const addeddNotification = yield addNotificationUseCase(dependencies).execute(datas);
            if (!addeddNotification) {
                return next(errorResponse_1.default.forbidden("Error occured in adding notification  of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: addeddNotification,
                    message: "notification  added"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.addNotificationController = addNotificationController;
