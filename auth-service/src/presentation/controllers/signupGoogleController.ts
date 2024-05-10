import { NextFunction, Request, Response, response } from "express";
import { IDependencies } from "../../domain/interfaces";
import { generatePassword } from "../../utils/password/generatePassword";
import { hashPassword } from "../../utils/hash/hashpassword";
import ErrorResponse from "../../utils/error/errorResponse";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig/config";


import { jwtDecode } from "jwt-decode";

export const signupGoogleController = (dependencies: IDependencies) => {
    const { useCases: { signupUserUseCase, emailExistUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const credentials: any = jwtDecode(req.body.id.credential);
            if (credentials.email) {
                let userData: any = {
                    email: undefined,
                    username: undefined,
                    password: undefined,
                    role: "user"

                };
                const emailExist: any = await emailExistUseCase(dependencies).execute({ email: credentials.email });

                if (emailExist) {
                    if (emailExist.blocked == true || emailExist.deleted == true) {
                        return next(ErrorResponse.badRequest('user blocked or deleted by admin'))
                    }
                    const payload = {
                        _id: String(emailExist._id),
                        email: emailExist.email,
                        role: emailExist.role!
                    };
                    const accessToken = Jwt.sign(payload, String(JWT_SECRET), { expiresIn: '24h' });
                    res.cookie('user_token', accessToken, { httpOnly: true });

                    return res.status(200).send({
                        success: true,
                        user: emailExist
                    });
                } else {
                    const generatedPassword = generatePassword()

                    const password = await hashPassword(generatedPassword)
                    if (!password) {
                        return next(ErrorResponse.forbidden('password required'))
                    } else {
                        userData.email = credentials.email
                        userData.password = password
                        userData.username = credentials.given_name

                        const user = await signupUserUseCase(dependencies).execute(userData)
                        if (!user) {
                            return next(ErrorResponse.notFound('failed to add user'))
                        }
                        const payload = {
                            _id: String(user._id),
                            email: user.email,
                            role: user.role!
                        }
                        const accessToken = Jwt.sign(payload, String(JWT_SECRET), { expiresIn: '24h' })
                        res.cookie('user_token', accessToken, {
                            httpOnly: true
                        })

                        return res.status(200).send({
                            success: true,
                            user: user,
                            message: "user signed in"

                        })

                    }

                }
            } else {
                return res.status(400).send({
                    success: true,
                    user: null,
                    error: "user not found"
                });
            }
        } catch (error) {
            next(error);
        }
    };
};
