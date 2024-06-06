import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




export const getRoomController = (dependencies: IDependencies) => {
    const { useCases: { getRoomUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query

            if (!id) {
                return next(ErrorResponse.badRequest("data is required"))
            }

            const rooms = await getRoomUseCase(dependencies).execute(String(id))
            if (!rooms) {

                return next(ErrorResponse.badRequest("data is required"))
            }


            return res.status(200).send({
                success: true,
                user: rooms,
                message: "fetched Room successfully"

            })


        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}