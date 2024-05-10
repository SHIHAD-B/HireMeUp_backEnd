import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


export const deletePlanController = (dependencies: IDependencies) => {
    const { useCases: { deletePlansUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id:string = req.body.id
            if (!id) {
                return next(ErrorResponse.badRequest("plan id is missing."));
            }
            const deletedPlan = await deletePlansUseCase(dependencies).execute(id)
            if (!deletedPlan) {
                return next(ErrorResponse.notFound("plan not found or unable to delete the plan"));
            } else {
                return res.status(200).json({
                    success: true,
                    user: deletedPlan,
                    message: "plan deleted successfully."
                });
            }

        } catch (error: any) {
            console.error("Error deleting plan:", error);
            return next(ErrorResponse.internalError("Failed to delete plan."));
        }
    }
}