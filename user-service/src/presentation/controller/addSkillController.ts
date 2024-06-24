import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";

/**
 * addSkillController - Controller function to handle adding a skill for a user.
 * 
 * This controller:
 * 1. Validates the incoming request body for required fields (`id` and `skill`).
 *    - If validation fails (missing data), returns a bad request error.
 * 2. Calls the `addSkillUseCase` to add the skill for the user identified by `id`.
 *    - If adding skill fails, returns a forbidden error.
 * 3. Returns a success response with the updated user object containing the added skill upon successful addition.
 */


export const addSkillController = (dependencies: IDependencies) => {
    const { useCases: { addSkillUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = req.body

            if (!datas || !datas.id || !datas.skill) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const { id, skill } = datas

            const editedUser = await addSkillUseCase(dependencies).execute(id, skill)
            if (!editedUser) {
                return next(ErrorResponse.forbidden("Error occured in adding skill  of user"))
            } else {
                return res.status(200).send({
                    success: true,
                    user: editedUser,
                    message: "user skill added"

                })
            }

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}