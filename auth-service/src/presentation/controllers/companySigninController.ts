import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { signinValidation } from "../../utils/validation/loginValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { generateAccessToken } from "../../utils/generateToken/accessToken";


/**
 * companySigninController - Handles company sign-in process.
 * 
 * This controller:
 * 1. Validates the request data using signinValidation.
 * 2. Checks if the company exists and the credentials are correct using companySigninUseCase.
 * 3. If the password is incorrect or the company is not found:
 *    - Returns appropriate error responses.
 * 4. If the company is blocked:
 *    - Returns an error response indicating the company is blocked by admin.
 * 5. If the credentials are correct:
 *    - Generates an access token and sets it in an HTTP-only cookie.
 *    - Returns a success response with the company details.
 */


export const companySigninController = (dependencies: IDependencies) => {
    const { useCases: { companySigninUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { value, error } = signinValidation.validate(req.body)
            if (error) {

                return next(ErrorResponse.conflict(String(error)))
            } else {
                const data = value
                const Company = await companySigninUseCase(dependencies).execute(data)
                if (Company == false) {

                    return next(ErrorResponse.badRequest('incorrect password'))
                } else if (Company == null) {

                    return next(ErrorResponse.notFound('Company not found'))
                } else if (Company !== true && Company?.deleted == true) {
                    return next(ErrorResponse.notFound('Company Blocked by Admin'))

                } else {

                    const accessToken = generateAccessToken(Company)
                    res.cookie('Company_token', accessToken, {
                        httpOnly: true,
                        sameSite:"none",
                        secure:true
                    })

                    res.status(200).json({
                        success: true,
                        user: Company,
                        message: "Company authenticated"
                    })

                }
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}