import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * deleteSkillController - Controller function to handle deleting a skill of a user.
 * 
 * This controller:
 * 1. Validates the incoming request body for `id` (user ID) and `skill` (skill to delete).
 *    - If validation fails (missing `id` or `skill`), returns a bad request error.
 * 2. Calls the `deleteSkillUseCase` to perform the deletion operation.
 *    - If the operation fails (skill not found or unable to delete skill), returns a forbidden error.
 * 3. Returns a success response with the updated user object upon successful deletion.
 */


export const deleteSkillController = (dependencies: IDependencies) => {
    const { useCases: { deleteSkillUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body
           

            if (!datas || !datas.id || !datas.skill) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { id,skill } = datas

            const editedUser = await deleteSkillUseCase(dependencies).execute(id,skill)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in deleting akill of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user skill deleted"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}