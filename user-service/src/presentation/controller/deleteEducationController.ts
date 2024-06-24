import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * deleteEducationController - Controller function to handle deleting education of a user.
 * 
 * This controller:
 * 1. Validates the incoming request body for `id` (education ID) and `userId`.
 *    - If validation fails (missing `id` or `userId`), returns a bad request error.
 * 2. Calls the `deleteEducationUseCase` to perform the deletion operation.
 *    - If the operation fails (education not found or unable to delete education), returns a forbidden error.
 * 3. Returns a success response with the updated user object upon successful deletion.
 */



export const deleteEducationController = (dependencies: IDependencies) => {
    const { useCases: { deleteEducationUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.userId) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { userId,id } = datas

            const editedUser = await deleteEducationUseCase(dependencies).execute(userId,id)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in deleting education  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user education deleted"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}