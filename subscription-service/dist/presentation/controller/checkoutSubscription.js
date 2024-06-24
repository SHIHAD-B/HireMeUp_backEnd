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
/**
 * checkoutSubscriptionController - Controller function to handle checkout process for subscription upgrade.
 *
 * This controller:
 * 1. Validates the incoming request data (`data` object containing `planId`).
 *    - If data is missing, returns a bad request error.
 * 2. Fetches plans using fetchPlansUseCase.
 *    - If fetching plans fails, returns an internal server error.
 * 3. Finds the selected plan based on the `planId` from the fetched plans.
 *    - If the selected plan is not found, returns a bad request error indicating plan not found.
 * 4. Calculates the discounted price based on the selected plan's price and discount percentage.
 * 5. Converts the final price to cents for Stripe compatibility and sets a minimum unit amount of 50 cents.
 * 6. Constructs a line item object for Stripe checkout session with the selected plan details.
 * 7. Creates a Stripe checkout session using `stripe.checkout.sessions.create` method.
 *    - Defines payment method types, line items, mode, success URL (redirects on success), and cancel URL (redirects on failure).
 * 8. Encrypts the success and cancel URLs using AES encryption before encoding them as query parameters.
 * 9. Returns a success response with the created session ID upon successful completion.
 */
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
