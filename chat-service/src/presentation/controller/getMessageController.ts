import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




export const getMessageController = (dependencies: IDependencies) => {
    const { useCases: { getMessageUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.query.id

            if (!data) {
                return next(ErrorResponse.badRequest("data is required"))
            }
            
            const messages=await getMessageUseCase(dependencies).execute(String(data))
            if(!messages){
                
                return next(ErrorResponse.badRequest("data is required"))
            }

           
                return res.status(200).send({
                    success: true,
                    user: messages,
                    message: "fetched message successfully"

                })
            

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}