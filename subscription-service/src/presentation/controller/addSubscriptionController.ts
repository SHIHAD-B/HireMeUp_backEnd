import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import RabbitMQClient from "../../infrastructure/rabbitmq/client";



export const addSubscriptionController = (dependencies: IDependencies) => {
    const { useCases: { fetchPlansUseCase, upgradeSubscriptionUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
       
            const { userId, planId } = req.body;

            if (!userId || !planId) {
                return next(ErrorResponse.badRequest("Data is required....."));
            }

            const plans = await fetchPlansUseCase(dependencies).execute();
         
            if (!plans) {
                return next(ErrorResponse.internalError("Internal Server Error"));
            }

            const selectedPlan = plans.find((item) => item._id == planId);
            if (!selectedPlan) {
                return next(ErrorResponse.badRequest("Plan not found"));
            } else {
                const data = {
                    _id:selectedPlan._id,
                    userId: userId
                }

                const upgradeSub:any = await upgradeSubscriptionUseCase(dependencies).execute(data)
              
                if (!upgradeSub) {
                    return next(ErrorResponse.internalError("subscription is not added"));
                    
                } else {

                    const DataToUser = {
                        userId:userId,
                        subscriptionId: upgradeSub?._id,
                        planId: selectedPlan._id,
                        name: selectedPlan.name,
                        end_date: upgradeSub?.end_date,
                    }
                    const client = await RabbitMQClient.getInstance();
                    const result = await client.produce(DataToUser, "addSubscription", "toUser");
                    if(!result){
                        return next(ErrorResponse.internalError("failed to add subscription to user"));

                    }else{

                        return res.status(200).json({
                            success: true,
                            data:result,
                            message: "subscription upgraded successfully"
                        });
                    }

                }

            }

        } catch (error: any) {
            console.log(error, "error")
            next(ErrorResponse.badRequest(error.message));
        }
    };
};


