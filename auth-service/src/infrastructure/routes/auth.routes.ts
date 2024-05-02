 import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controllers } from "../../presentation/controllers";

export const authRoutes = (dependencies: IDependencies) => {
    const { signinUser, signupUser,logout,forgot ,companySignup} = controllers(dependencies)

    const router = Router();

    router.route('/signin').post(signinUser)
    router.route('/signup').post(signupUser)
    router.route('/logout').get(logout)
    router.route('/forgot').post(forgot)
    router.route('/companysignup').post(companySignup)
    return router
}