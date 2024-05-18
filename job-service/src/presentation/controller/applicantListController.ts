import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";



export const applicantListController = (dependencies: IDependencies) => {
    const { useCases: { listApplicantsUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

                const applicants: any = await listApplicantsUseCase(dependencies).execute()
                if (!applicants) {
                    return next(ErrorResponse.badRequest("failed to list applicants.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: applicants,
                        message: "applicants listed successfully..."
                    })
                }
        }

        catch (error) {
            next(error)

        }
    }
}