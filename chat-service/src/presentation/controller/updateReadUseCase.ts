import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




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