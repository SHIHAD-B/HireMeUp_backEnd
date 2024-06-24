import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import Stripe from "stripe";
import { ENCRYPTION_KEY, STRIPE_SECRET_KEY } from "../../config/envConfig/config";
import CryptoJS  from 'crypto-js'


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



function encrypt(text:any, key:any) {
    return CryptoJS.AES.encrypt(text, key).toString();
}


const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' });

export const checkoutSubscriptionController = (dependencies: IDependencies) => {
    const { useCases: { fetchPlansUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body;

            if (!data) {
                return next(ErrorResponse.badRequest("Data is required"));
            }

            const plans = await fetchPlansUseCase(dependencies).execute();
            if (!plans) {
                return next(ErrorResponse.internalError("Internal Server Error"));
            }

            const selectedPlan = plans.find((item) => item._id == data.planId);
            if (!selectedPlan) {
                return next(ErrorResponse.badRequest("Plan not found"));
            }
            const discountAmount = (selectedPlan.price * selectedPlan.discount) / 100;
            const finalPrice = selectedPlan.price - discountAmount;
            
            const unitAmountInCents = Math.max(
                Math.floor(finalPrice * 100), 
                50 
            );
        
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

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [lineItem],
                mode: "payment",
                success_url: `http://localhost:5173/subscription?data=${encodeURIComponent(encrypt(JSON.stringify({ planId: data.planId }), ENCRYPTION_KEY))}`,
                cancel_url: `http://localhost:5173/subscription?data=${encodeURIComponent(encrypt('Failed to process payment', ENCRYPTION_KEY))}`,

            });

            return res.status(200).json({
                success: true,
                id: session.id,
                message: "subscription upgraded successfully"
            });
        } catch (error: any) {
            console.log(error,"error")
            next(ErrorResponse.badRequest(error.message));
        }
    };
};


