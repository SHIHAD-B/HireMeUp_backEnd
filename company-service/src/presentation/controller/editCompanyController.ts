import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { setProfileOneValidation } from "../../utils/validation/editCompanyValidation";


/**
 * editCompanyController - Controller function to edit a company's details.
 * 
 * Steps:
 * 1. Retrieves company data from the request body.
 * 2. Validates that company data is provided; otherwise, returns a bad request error.
 * 3. Removes sensitive fields from the company data to avoid unintended updates.
 * 4. Validates the edited company data format using setProfileOneValidation.
 *    - If validation fails, returns a bad request error with the validation message.
 * 5. Executes the editCompanyUseCase to update the company details based on the edited data.
 * 6. Returns a not found error if the company is not found or unable to be edited.
 * 7. Returns a success response with the updated company's information upon successful edit.
 * 8. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


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
