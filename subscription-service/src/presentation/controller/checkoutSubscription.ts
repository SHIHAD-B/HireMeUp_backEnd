import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import Stripe from "stripe";
import { ENCRYPTION_KEY, STRIPE_SECRET_KEY } from "../../config/envConfig/config";
import CryptoJS  from 'crypto-js'

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
            const unitAmountInCents = Math.max(
                Math.round((selectedPlan?.price ?? 0) * 100), 
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


