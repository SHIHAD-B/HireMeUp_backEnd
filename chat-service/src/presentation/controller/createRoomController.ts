import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";




export const createRoomController = (dependencies: IDependencies) => {
    const { useCases: { createRoomUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
    
            if (!data || !data.sender || !data.receiver)  {
                return next(ErrorResponse.badRequest("data is required"))
            }
            
            const sendMessage=await createRoomUseCase(dependencies).execute(data)
            if(!sendMessage){
                
                return next(ErrorResponse.badRequest("data is required"))
            }

           
                return res.status(200).send({
                    success: true,
                    user: sendMessage,
                    message: "room created successfully"

                })
            

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}