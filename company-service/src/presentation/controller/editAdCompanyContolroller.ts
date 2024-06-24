import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { editCompanyValidation } from "../../utils/validation/editAdCompany";
import { hashPassword } from "../../utils/hash/hashpassword";

/**
 * editAdCompanyController - Controller function to edit an advertising company's details.
 * 
 * Steps:
 * 1. Retrieves company data from the request body.
 * 2. Validates that company data is provided; otherwise, returns a bad request error.
 * 3. Removes sensitive fields from the company data to avoid unintended updates.
 * 4. Validates the edited company data format using editCompanyValidation.
 *    - If validation fails, returns a bad request error with the validation message.
 * 5. If a new password is provided in the data, hashes the password using hashPassword utility function.
 *    - Returns a forbidden error if hashing fails; otherwise, updates the password in the data.
 * 6. Executes the editCompanyUseCase to update the company details based on the edited data.
 * 7. Returns a not found error if the company is not found or unable to be edited.
 * 8. Returns a success response with the updated company's information upon successful edit.
 * 9. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const editAdCompanyController = (dependencies: IDependencies) => {
    const { useCases: { editCompanyUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            if (!data) {
                return next(ErrorResponse.badRequest("Company data is missing."));
            }
            
            delete data.status
            delete data.tech_stack
            delete data.images
            delete data.approval
            delete data.benefits
            delete data.location
            delete data.createdAt
            delete data.__v
            delete data.deleted

          

            const { value, error } =editCompanyValidation.validate(data, { abortEarly: false });
            
            if (error) {
                const errorMessages = error.details.map((detail: any) => detail.message).join(", ");
                return next(ErrorResponse.badRequest(errorMessages));
            }

            if (value.password) {
                const password = await hashPassword(value.password)
                if (!password) {
                    return next(ErrorResponse.forbidden("Error occured in hashing password"))
                } else {
                    value.password = password
                }
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
