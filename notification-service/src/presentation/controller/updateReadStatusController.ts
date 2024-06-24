import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/error/errorResponse";
import { IDependencies } from "../../domain/interfaces/dependencies";


/**
 * updateReadStatusController - Controller function to handle updating read status of notifications for a user.
 * 
 * This controller:
 * 1. Retrieves the notification id from request body.
 *    - If id is missing, returns a bad request error.
 * 2. Executes updateReadStatusUseCase to update the read status for the specified notification id.
 *    - If updating read status fails, returns a forbidden error with details.
 *    - If updating read status succeeds, returns a success response indicating the status update.
 * 3. Passes any errors encountered during the process to the error handling middleware.
 */



export const updateReadStatusController = (dependencies: IDependencies) => {
    const { useCases: { updateReadStatusUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.body.id
          

            if (!id ) {
                return next(ErrorResponse.badRequest("id is required"))
            }

           
            const updateread  = await updateReadStatusUseCase(dependencies).execute(String(id))
            if (!updateread) {
                return next(ErrorResponse.forbidden("Error occured in updating read status  of user"))
            } else {
                
                return res.status(200).send({
                    success: true,
                    user: updateread,
                    message: "read status is   updated"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}