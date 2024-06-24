import { IDependencies } from "../../domain/interfaces";
import { signinUserController } from "./signinUserController";
import { signupUserController } from './signupUserController';
import { forgotController } from "./forgotController";
import { companySignupController } from "./companySignupController";
import { logout } from './logout'
import { signupGoogleController } from "./signupGoogleController";
import { companySigninController } from "./companySigninController";
import { adminSigninController } from "./adminSigninController";
import { companyForgotController } from "./companyForgotController";
import { tokenRefreshController } from "./tokenRefreshContoller";

export const controllers = (dependencies: IDependencies) => {
    return {
        signinUser: signinUserController(dependencies),
        signupUser: signupUserController(dependencies),
        forgot: forgotController(dependencies),
        logout: logout(),
        companySignup: companySignupController(dependencies),
        signupWithGoogle: signupGoogleController(dependencies),
        companySignin: companySigninController(dependencies),
        adminSignin: adminSigninController(dependencies),
        companyForgot: companyForgotController(dependencies),
        tokenRefresh:tokenRefreshController(dependencies)
    }
}