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
exports.checkoutSubscriptionController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("../../config/envConfig/config");
const crypto_js_1 = __importDefault(require("crypto-js"));
function encrypt(text, key) {
    return crypto_js_1.default.AES.encrypt(text, key).toString();
}
const stripe = new stripe_1.default(config_1.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });
const checkoutSubscriptionController = (dependencies) => {
    const { useCases: { fetchPlansUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = req.body;
            if (!data) {
                return next(errorResponse_1.default.badRequest("Data is required"));
            }
            const plans = yield fetchPlansUseCase(dependencies).execute();
            if (!plans) {
                return next(errorResponse_1.default.internalError("Internal Server Error"));
            }
            const selectedPlan = plans.find((item) => item._id == data.planId);
            if (!selectedPlan) {
                return next(errorResponse_1.default.badRequest("Plan not found"));
            }
            const discountAmount = (selectedPlan.price * selectedPlan.discount) / 100;
            const finalPrice = selectedPlan.price - discountAmount;
            const unitAmountInCents = Math.max(Math.floor(finalPrice * 100), 50);
            const unitAmountInDollars = unitAmountInCents / 100;
            const lineItem = {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: selectedPlan.name,
                    },
                    unit_amount: unitAmountInCents
                },
                quantity: 1
            };
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [lineItem],
                mode: "payment",
                success_url: `http://localhost:5173/subscription?data=${encodeURIComponent(encrypt(JSON.stringify({ planId: data.planId }), config_1.ENCRYPTION_KEY))}`,
                cancel_url: `http://localhost:5173/subscription?data=${encodeURIComponent(encrypt('Failed to process payment', config_1.ENCRYPTION_KEY))}`,
            });
            return res.status(200).json({
                success: true,
                id: session.id,
                message: "subscription upgraded successfully"
            });
        }
        catch (error) {
            console.log(error, "error");
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.checkoutSubscriptionController = checkoutSubscriptionController;
