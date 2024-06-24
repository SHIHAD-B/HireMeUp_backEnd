import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { setProfileOneValidation } from "../../utils/validation/editCompanyValidation";

export const editCompanyController = (dependencies: IDependencies) => {
    const { useCases: { editCompanyUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            if (!data) {
                return next(ErrorResponse.badRequest("Company data is missing."));
            }
            delete data.status
            delete data.deleted
            delete data.images
            delete data.approval
            delete data.benefits
            delete data.createdAt
            delete data.profile
            delete data.__v

            const { value, error } = setProfileOneValidation.validate(data, { abortEarly: false });
            
            if (error) {
                const errorMessages = error.details.map((detail: any) => detail.message).join(", ");
                return next(ErrorResponse.badRequest(errorMessages));
            }

            const editCompany = await editCompanyUseCase(dependencies).execute(value); 

            if (!editCompany) {
                return next(ErrorResponse.notFound("Company not found or unable to edit company."));
            }

            return res.status(200).json({
                success: true,
                user: editCompany,
                message: "Company edited successfully."
            });
        } catch (error: any) {
            console.error("Error editing company:", error);
            return next(ErrorResponse.internalError("Failed to edit company."));
        }
    }
}
