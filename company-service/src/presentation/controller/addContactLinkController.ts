import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import { ContactLinkValidation } from "../../utils/validation/addContactLinksValidation";

/**
 * addContactLinksController - Handles the addition of contact links for a user using addContactLinksUseCase.
 * 
 * Responsibilities:
 * - Validates the incoming request body data using ContactLinkValidation.
 * - Returns a bad request error if validation fails, including all validation errors.
 * - Executes the addContactLinksUseCase to add contact links based on the provided data.
 * - Returns a not found error if the user is not found during the operation.
 * - Returns a not found error if adding the contact links fails for other reasons.
 * - Returns an internal server error if any unexpected error occurs.
 * - Logs any errors encountered during the process and passes them to the error handler middleware.
 */

export const addContactLinksController = (dependencies: IDependencies) => {
    const { useCases: { addContactLinksUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const { value, error } = ContactLinkValidation.validate(data, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map((detail: any) => detail.message).join(", ");
                return next(ErrorResponse.badRequest(errorMessages));
            }


            const updateLink = await addContactLinksUseCase(dependencies).execute(data)
            if (updateLink == false) {

                return next(ErrorResponse.notFound("user not found"));
            } else if (!updateLink) {
                return next(ErrorResponse.notFound("failed to add the contact links."));
            }

            return res.status(200).json({
                success: true,
                user: updateLink,
                message: "contacts added successfully."
            });
        } catch (error: any) {
            console.error("Error adding conatact links:", error);
            return next(ErrorResponse.internalError("Failed to add contact links."));
        }
    }
}