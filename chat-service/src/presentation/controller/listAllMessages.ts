import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";


/**
 * listAllMessageController - Retrieves all messages associated with a particular room ID.
 * 
 * This controller:
 * 1. Retrieves the room ID from the request query parameters.
 * 2. Validates if the room ID is provided.
 * 3. Executes the listAllMessageUseCase to fetch all messages for the provided room ID.
 * 4. Returns an error response if the room ID is missing or if fetching messages fails.
 * 5. Returns a success response with the fetched messages if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */


export const listAllMessageController = (dependencies: IDependencies) => {
    const { useCases: { listAllMessageUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.query.id

            if (!data) {
                return next(ErrorResponse.badRequest("data is required"))
            }
            
            const messages=await listAllMessageUseCase(dependencies).execute(String(data))
            if(!messages){
                
                return next(ErrorResponse.badRequest("data is required"))
            }

           
                return res.status(200).send({
                    success: true,
                    user: messages,
                    message: "message listed successfully"

                })
            

        } catch (error: any) {
            next(ErrorResponse.badRequest(error.message))
        }
    }
}