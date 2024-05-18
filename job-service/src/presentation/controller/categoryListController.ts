import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";



export const categoryListController = (dependencies: IDependencies) => {
    const { useCases: { listCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

                const category: any = await listCategoryUseCase(dependencies).execute()
                if (!category) {
                    return next(ErrorResponse.badRequest("failed to list category.."))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: category,
                        message: "category listed successfully..."
                    })
                }
        }

        catch (error) {
            next(error)

        }
    }
}