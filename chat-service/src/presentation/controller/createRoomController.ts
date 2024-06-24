import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * createRoomController - Handles the creation of a chat room between users.
 * 
 * This controller:
 * 1. Receives data from the request body containing sender and receiver information.
 * 2. Validates if the required data (sender and receiver) are present.
 * 3. Executes the createRoomUseCase to create a room with the provided sender and receiver.
 * 4. Returns an error response if the required data is missing or if the room creation fails.
 * 5. Returns a success response with the created room details if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */


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