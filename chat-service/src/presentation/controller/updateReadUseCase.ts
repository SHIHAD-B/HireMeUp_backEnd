import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * updateReadStatusController - Updates read status using the updateReadUseCase.
 * 
 * This controller:
 * 1. Retrieves sender, receiver, and status from the request body.
 * 2. Validates if all required fields are provided.
 * 3. Executes the updateReadUseCase to update the read status based on the provided data.
 * 4. Returns an error response if any required data is missing or if updating the status fails.
 * 5. Returns a success response with the updated status details if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */


export const updateReadStatusController = (dependencies: IDependencies) => {
    const { useCases: { updateReadUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { sender, receiver, status } = req.body

            if (!sender || !receiver || !status) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const updateStatus = await updateReadUseCase(dependencies).execute(sender, receiver, status)
            if (!updateStatus) {

                return next(ErrorResponse.badRequest("data is required...."))
            }


            return res.status(200).send({
                success: true,
                user: updateStatus,
                message: "status updated successfully"

            })


        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}