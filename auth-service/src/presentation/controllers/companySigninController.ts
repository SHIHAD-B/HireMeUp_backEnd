import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { JWT_SECRET } from "../../config/envConfig/config";
import Jwt from "jsonwebtoken";
import { signinValidation } from "../../utils/validation/loginValidation";
import ErrorResponse from "../../utils/error/errorResponse";



export const companySigninController = (dependencies: IDependencies) => {
    const { useCases: { companySigninUseCase } } = dependencies


    const generateAccessToken = (company: any) => {
        const payload = {
            _id: String(company?._id),
            email: company?.email!,
            role: company?.role!
        };
        return Jwt.sign(
            payload,
            String(JWT_SECRET),
            { expiresIn: '24h' }
        );
    };



    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body,"body from back end")
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
                } else {

                    const accessToken = generateAccessToken(Company)
                    res.cookie('Company_token', accessToken, {
                        httpOnly: true
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