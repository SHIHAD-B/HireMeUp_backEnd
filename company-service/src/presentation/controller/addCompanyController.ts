import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { sendApprovalNotification } from "../../utils/otp/sentAck";
import { addCompanyValidation } from "../../utils/validation/addCompanyValidation";

/**
 * addCompanyController - Handles the addition of a company using the addCompanyUseCase.
 * 
 * This controller:
 * 1. Validates the incoming request body data using addCompanyValidation.
 * 2. Returns a bad request error if validation fails, including all validation errors.
 * 3. Executes the addCompanyUseCase to add a new company based on the provided data.
 * 4. Returns a not found error if adding the company fails.
 * 5. Sends an approval notification email using sendApprovalNotification if successful.
 * 6. Returns a success response with the added company details upon successful addition.
 * 7. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const addCompanyController = (dependencies: IDependencies) => {
    const { useCases: { addCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const { value, error } = addCompanyValidation.validate(data, { abortEarly: false });
            
            if (error) {
                const errorMessages = error.details.map((detail: any) => detail.message).join(", ");
                return next(ErrorResponse.badRequest(errorMessages));
            }


            const approveRequests = await addCompanyUseCase(dependencies).execute(data)
            if (!approveRequests) {
                return next(ErrorResponse.notFound("failed to add the company"));
            } else {
                sendApprovalNotification(data.email)
                return res.status(200).json({
                    success: true,
                    user: approveRequests,
                    message: "company added successfully."
                });
            }

        } catch (error: any) {
            console.error("Error adding company:", error);
            return next(ErrorResponse.internalError("Failed to add company."));
        }
    }
}