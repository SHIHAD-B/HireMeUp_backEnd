import { IDependencies } from "../../domain/interfaces";
import { signinUserController } from "./signinUserController";
import { signupUserController } from './signupUserController';
import { forgotController } from "./forgotController";
import { companySignupController } from "./companySignupController";
import { logout } from './logout'

export const controllers = (dependencies: IDependencies) => {
    return {
        signinUser: signinUserController(dependencies),
        signupUser: signupUserController(dependencies),
        forgot: forgotController(dependencies),
        logout: logout(),
        companySignup: companySignupController(dependencies)
    }
}