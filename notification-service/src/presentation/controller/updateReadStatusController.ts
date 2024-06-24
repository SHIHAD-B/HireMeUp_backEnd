import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/error/errorResponse";
import { IDependencies } from "../../domain/interfaces/dependencies";





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