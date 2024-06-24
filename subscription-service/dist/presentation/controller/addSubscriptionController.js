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
exports.addSubscriptionController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const client_1 = __importDefault(require("../../infrastructure/rabbitmq/client"));
/**
 * addSubscriptionController - Controller function to handle adding a subscription for a user.
 *
 * This controller:
 * 1. Validates the incoming request data (userId, planId).
 *    - If data is missing, returns a bad request error.
 * 2. Fetches plans using fetchPlansUseCase.
 *    - If fetching plans fails, returns an internal server error.
 * 3. Finds the selected plan based on the planId from the fetched plans.
 *    - If the selected plan is not found, returns a bad request error indicating plan not found.
 * 4. Executes upgradeSubscriptionUseCase to upgrade the user's subscription.
 *    - If upgrading subscription fails, returns an internal server error indicating subscription not added.
 * 5. Constructs data to send to the user (userId, subscriptionId, planId, name, end_date).
 * 6. Uses RabbitMQClient to produce a message (DataToUser) to notify the user about the subscription.
 *    - If producing the message fails, returns an internal server error indicating failed to add subscription to user.
 * 7. Returns a success response with the updated subscription details upon successful completion.
 */
const addSubscriptionController = (dependencies) => {
    const { useCases: { fetchPlansUseCase, upgradeSubscriptionUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, planId } = req.body;
            if (!userId || !planId) {
                return next(errorResponse_1.default.badRequest("Data is required....."));
            }
            const plans = yield fetchPlansUseCase(dependencies).execute();
            if (!plans) {
                return next(errorResponse_1.default.internalError("Internal Server Error"));
            }
            const selectedPlan = plans.find((item) => item._id == planId);
            if (!selectedPlan) {
                return next(errorResponse_1.default.badRequest("Plan not found"));
            }
            else {
                const data = {
                    _id: selectedPlan._id,
                    userId: userId
                };
                const upgradeSub = yield upgradeSubscriptionUseCase(dependencies).execute(data);
                if (!upgradeSub) {
                    return next(errorResponse_1.default.internalError("subscription is not added"));
                }
                else {
                    const DataToUser = {
                        userId: userId,
                        subscriptionId: upgradeSub === null || upgradeSub === void 0 ? void 0 : upgradeSub._id,
                        planId: selectedPlan._id,
                        name: selectedPlan.name,
                        end_date: upgradeSub === null || upgradeSub === void 0 ? void 0 : upgradeSub.end_date,
                    };
                    const client = yield client_1.default.getInstance();
                    const result = yield client.produce(DataToUser, "addSubscription", "toUser");
                    if (!result) {
                        return next(errorResponse_1.default.internalError("failed to add subscription to user"));
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            data: result,
                            message: "subscription upgraded successfully"
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error, "error");
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.addSubscriptionController = addSubscriptionController;
