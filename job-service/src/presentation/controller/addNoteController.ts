import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";
import { IApplicants } from "../../domain/entities";



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