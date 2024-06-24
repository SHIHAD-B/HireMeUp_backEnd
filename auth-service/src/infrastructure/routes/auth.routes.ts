import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controllers } from "../../presentation/controllers";


export const authRoutes = (dependencies: IDependencies) => {
    const { signinUser,
        signupUser,
        logout,
        forgot,
        companySignup,
        signupWithGoogle,
        companySignin,
        adminSignin,
        tokenRefresh,
        companyForgot } = controllers(dependencies)

    const router = Router();

    router.route('/signin').post(signinUser)
    router.route('/signup').post(signupUser)
    router.route('/logout').get(logout)
    router.route('/forgot').post(forgot)
    router.route('/signupwithgoogle').post(signupWithGoogle)
    router.route('/companysignup').post(companySignup)
    router.route('/companysignin').post(companySignin)
    router.route('/adminsignin').post(adminSignin)
    router.route('/companyforgot').post(companyForgot)
    router.route('/refreshToken').post(tokenRefresh)
    return router
}