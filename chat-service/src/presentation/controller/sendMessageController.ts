import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




export const sendMessageController = (dependencies: IDependencies) => {
    const { useCases: { sendMessageUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            console.log(req.body,"rec body...")
            if (!data) {
                return next(ErrorResponse.badRequest("data is required"))
            }
            
            const sendMessage=await sendMessageUseCase(dependencies).execute(data)
            if(!sendMessage){
                
                return next(ErrorResponse.badRequest("data is required...."))
            }

           
                return res.status(200).send({
                    success: true,
                    user: sendMessage,
                    message: "message send successfully"

                })
            

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}