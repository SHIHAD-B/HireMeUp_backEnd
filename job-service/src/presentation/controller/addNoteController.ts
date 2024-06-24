import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";

/**
 * addNoteController - Controller function to handle adding notes using the addNoteUseCase.
 * 
 * This controller:
 * 1. Destructures the 'id', 'employee', and 'notes' from the request body.
 *    - If any of these fields are missing, returns a null response.
 * 2. Executes the addNoteUseCase to add the note based on the request body.
 *    - If adding the note fails, returns a bad request error.
 * 3. Returns a success response with the added note data if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */


export const addNoteController = (dependencies: IDependencies) => {
    const { useCases: { addNoteUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id, employee, notes } = req.body
            if (!id || !employee || !notes) {
                return null
            }

            const addnotes: IApplicants | null = await addNoteUseCase(dependencies).execute(req.body)
            if (!addnotes) {
                return next(ErrorResponse.badRequest("failed to add note.."))
            } else {
                return res.status(200).json({
                    success: true,
                    user: addnotes,
                    message: "note added successfully..."
                })
            }


        }



        catch (error) {
            next(error)

        }
    }
}