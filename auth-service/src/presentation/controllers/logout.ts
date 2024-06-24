import { NextFunction, Request, Response } from "express";


/**
 * logout - Handles user logout process.
 * 
 * This controller:
 * 1. Clears the cookies for 'user_token', 'Company_token', and 'admin_token'.
 * 2. Returns a success response indicating the user has logged out successfully.
 * 3. Catches any errors during the process and passes them to the next middleware.
 */

export const logout = () => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            res.clearCookie('user_token');
            res.clearCookie('Company_token');
            res.clearCookie('admin_token')
            res.status(200).json({ success: true, message: "User logged out successfully" });
        } catch (error: any) {
            next(error);
        }
    }
};
