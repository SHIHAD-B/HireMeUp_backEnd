import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { JWT_SECRET } from "../../config/envConfig/config";
import Jwt from "jsonwebtoken";
import { signinValidation } from "../../utils/validation/loginValidation";
import ErrorResponse from "../../utils/error/errorResponse";
import { IAdminEntity } from "../../domain/entities";
import { generateAccessToken } from "../../utils/generateToken/accessToken";



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
                    return next(ErrorResponse.badRequest('incorrect password'))
                }else if(admin==true){
                    return next(ErrorResponse.badRequest('incorrect password'))
                } else if (admin == null) {
                    return next(ErrorResponse.notFound('admin not found'))
                } else if (admin?.blocked == true ) {
                    return next(ErrorResponse.badRequest('admin blocked or deleted by admin'))
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