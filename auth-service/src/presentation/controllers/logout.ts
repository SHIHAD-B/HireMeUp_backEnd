import { NextFunction, Request, Response } from "express";

export const logout = () => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            res.clearCookie('user_token');
            res.clearCookie('Company_token');
            res.status(200).json({ success: true, message: "User logged out successfully" });
        } catch (error: any) {
            next(error);
        }
    }
};
