import { ISigninUserUseCase, IEmailExistUserUseCase, ISignupUserUseCase, IVerfiyOtpUseCase, ICompanySignupUseCase,ICompanyEmailExistUseCase} from "../useCaseInterface";
import { IDependencies } from "./dependencies";

export interface IUseCases {
    signupUserUseCase: (dependencies: IDependencies) => ISignupUserUseCase;
    signinUserUseCase: (dependencies: IDependencies) => ISigninUserUseCase;
    verifyOtpUseCase: (dependencies: IDependencies) => IVerfiyOtpUseCase;
    emailExistUseCase: (dependencies: IDependencies) => IEmailExistUserUseCase;
    companySignupUseCase: (dependencies: IDependencies) => ICompanySignupUseCase;
    companyEmailExistUseCase: (dependencies: IDependencies) => ICompanyEmailExistUseCase;
}