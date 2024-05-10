import { Response, Request, NextFunction } from "express";
import { IDependencies } from "../../domain/interfaces";
import ErrorResponse from "../../utils/error/errorResponse";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig/config";

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