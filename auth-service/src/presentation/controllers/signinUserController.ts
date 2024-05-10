import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { JWT_SECRET } from "../../config/envConfig/config";
import Jwt from "jsonwebtoken";
import { signinValidation } from "../../utils/validation/loginValidation";
import ErrorResponse from "../../utils/error/errorResponse";



export const signinUserController = (dependencies: IDependencies) => {
    const { useCases: { signinUserUseCase } } = dependencies


    const generateAccessToken = (user: any) => {
        const payload = {
            _id: String(user?._id),
            email: user?.email!,
            role: user?.role!
        };
        return Jwt.sign(
            payload,
            String(JWT_SECRET),
            { expiresIn: '24h' }
        );
    };



    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = signinValidation.validate(req.body)
            if (error) {

                return next(ErrorResponse.conflict(String(error)))
            } else {
                const data = value
                const User: any = await signinUserUseCase(dependencies).execute(data)
                if (User == false) {

                    return next(ErrorResponse.badRequest('incorrect password'))
                } else if (User == null) {

                    return next(ErrorResponse.notFound('user not found'))
                } else if (User?.blocked == true || User.deleted == true) {
                    return next(ErrorResponse.badRequest('user blocked or deleted by admin'))
                } else {

                    const accessToken = generateAccessToken(User)
                    res.cookie('user_token', accessToken, {
                        httpOnly: true
                    })

                    res.status(200).json({
                        success: true,
                        user: User,
                        message: "user authenticated"
                    })

                }
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}