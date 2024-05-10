import {
    ISigninUserUseCase,
    IEmailExistUserUseCase,
    ISignupUserUseCase,
    IVerfiyOtpUseCase,
    ICompanySignupUseCase,
    ICompanyEmailExistUseCase,
    ICompanySigninUseCase,
    IAdminSigninUseCase
} from "../useCaseInterface";

import { IDependencies } from "./dependencies";

export interface IUseCases {
    signupUserUseCase: (dependencies: IDependencies) => ISignupUserUseCase;
    signinUserUseCase: (dependencies: IDependencies) => ISigninUserUseCase;
    verifyOtpUseCase: (dependencies: IDependencies) => IVerfiyOtpUseCase;
    emailExistUseCase: (dependencies: IDependencies) => IEmailExistUserUseCase;
    companySignupUseCase: (dependencies: IDependencies) => ICompanySignupUseCase;
    companyEmailExistUseCase: (dependencies: IDependencies) => ICompanyEmailExistUseCase;
    companySigninUseCase: (dependencies: IDependencies) => ICompanySigninUseCase;
    adminSigninUseCase: (dependencies: IDependencies) => IAdminSigninUseCase


}