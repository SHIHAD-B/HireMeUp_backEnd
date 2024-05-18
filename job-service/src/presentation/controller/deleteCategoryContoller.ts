import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interface";
import ErrorResponse from "../../utils/error/errorResponse";



export const deleteCategoryController = (dependencies: IDependencies) => {
    const { useCases: { deleteCategoryUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id
            if (!id) {
                return next(ErrorResponse.badRequest("credential is missing"))
            } else {

                const category: any = await deleteCategoryUseCase(dependencies).execute(id)
                if (!category) {
                    return next(ErrorResponse.forbidden("failed to delete category"))
                } else {
                    return res.status(200).json({
                        success: true,
                        user: category,
                        message: "category delete successfully..."
                    })
                }
            }

        }

        catch (error) {
            next(error)

        }
    }
}