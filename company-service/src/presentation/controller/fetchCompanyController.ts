import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig/config";


/**
 * fetchCompanyController - Controller function to fetch company details based on the provided company token.
 * 
 * Steps:
 * 1. Retrieves the company token from the request cookies.
 * 2. Validates that the company token is provided; otherwise, returns a bad request error.
 * 3. Verifies the validity of the company token using jwt.verify and retrieves the decoded email.
 *    - Returns null if there's an error during token verification.
 * 4. Validates that the decoded email is present; otherwise, returns a bad request error.
 * 5. Executes the fetchCompanyUseCase to retrieve company details based on the decoded email.
 * 6. Returns a not found error if the company is not found or unable to be fetched.
 * 7. Checks if the fetched company is blocked or deleted; returns a failure response if true.
 * 8. Returns a success response with the fetched company details upon successful retrieval.
 * 9. Logs any errors encountered during the process and passes them to the error handler middleware.
 */


export const fetchCompanyController = (dependencies: IDependencies) => {
    const { useCases: { fetchCompanyUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { Company_token } = req.cookies;
           
            if (!Company_token) {
                return next(ErrorResponse.badRequest("company token is missing."));
            }
            const deToken: any = jwt.verify(Company_token, JWT_SECRET, (error: any, decode: any) => {
                if (error) {
                    return null
                }
                return decode
            });
            const { email } = deToken

            if (!email) {
                return next(ErrorResponse.badRequest("company email is missing."));
            }
            const user: any = await fetchCompanyUseCase(dependencies).execute(email)
            if (!user) {
                return next(ErrorResponse.notFound("company not found or unable to fetch company."));
            } else if (user.blocked == true || user.deleted == true) {
                return res.status(200).json({
                    success: false,
                    user: null,
                    message: "company is blocked or deleted"
                });
            } else {
               
                return res.status(200).json({
                    success: true,
                    user: user,
                    message: "company fetched successfully."
                });
            }

        } catch (error: any) {
            console.error("Error fetching company:", error);
            return next(ErrorResponse.internalError("Failed to fetch company."));
        }
    }
}