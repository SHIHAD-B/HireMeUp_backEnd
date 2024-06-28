import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { signinValidation } from "../../utils/validation/loginValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { IAdminEntity } from "../../domain/entities";
import { generateAccessToken } from "../../utils/generateToken/accessToken";


/**
 * adminSigninController - Handles admin sign-in process.
 * 
 * This controller:
 * 1. Validates the request data using signinValidation.
 * 2. Checks if the admin exists and the credentials are correct using adminSigninUseCase.
 * 3. If the password is incorrect or the admin is not found:
 *    - Returns appropriate error responses.
 * 4. If the admin is blocked:
 *    - Returns an error response indicating the admin is blocked or deleted.
 * 5. If the credentials are correct:
 *    - Generates an access token and sets it in an HTTP-only cookie.
 *    - Returns a success response with the admin details.
 */


export const adminSigninController = (dependencies: IDependencies) => {
    const { useCases: { adminSigninUseCase } } = dependencies


    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = signinValidation.validate(req.body)
            if (error) {

                return next(ErrorResponse.conflict(String(error)))
            } else {
                const data = value
                const admin: IAdminEntity | boolean | null = await adminSigninUseCase(dependencies).execute(data)
                if (admin == false) {
                    return next(ErrorResponse.badRequest('incorrect password.'))
                }else if(admin==true){
                    return next(ErrorResponse.badRequest('incorrect password'))
                } else if (admin == null) {
                    return next(ErrorResponse.notFound('admin not found'))
                } else if (admin?.blocked == true ) {
                    return next(ErrorResponse.badRequest('admin blocked or deleted by admin..'))
                } else {

                    const accessToken = generateAccessToken(admin)
                    res.cookie('admin_token', accessToken, {
                        httpOnly: true
                    })

                    res.status(200).json({
                        success: true,
                        user: admin,
                        message: "admin authenticated"
                    })

                }
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}