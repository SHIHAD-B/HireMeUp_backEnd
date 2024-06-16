import {
    IAddUserUseCase,
    IBlockUseCase,
    IDeleteUseCase,
    IUpdateUserUseCase,
    IFetchUseCase,
    IListUseCase,
    IResetUseCase,
    IAddOtpUseCase,
    IRecoverUseCase,
    IFetchAdminUseCase,
    IUpdateProfileUseCase,
    IAddExperienceUseCase,
    IDeleteExperienceUseCase,
    IEditExperienceUseCase,
    IAddEducationUseCase,
    IDeleteEducationUseCase,
    IEditEducationUseCase,
    IAddSkillCase,
    IDeleteSkillCase,
    IAddLanguageCase,
    IDeleteLanguageCase,
    ISoclailLinkUseCase,
    IAddResumeUseCase,
    IAddAddressUseCase

} from '../useCaseInterface'
import { IDependencies } from './dependencies'

export interface IUseCases {
    addUserUseCase: (dependencies: IDependencies) => IAddUserUseCase;
    blockUserUseCase: (dependencies: IDependencies) => IBlockUseCase;
    unblockUserUseCase: (dependencies: IDependencies) => IBlockUseCase;
    deleteUserUseCase: (dependencies: IDependencies) => IDeleteUseCase;
    recoverUserUseCase: (dependencies: IDependencies) => IRecoverUseCase;
    updateUserUseCase: (dependencies: IDependencies) => IUpdateUserUseCase;
    fetchUserUseCase: (dependencies: IDependencies) => IFetchUseCase;
    listUserUseCase: (dependencies: IDependencies) => IListUseCase;
    resetPasswordUseCase: (dependencies: IDependencies) => IResetUseCase;
    addOtpUseCase: (dependencies: IDependencies) => IAddOtpUseCase;
    fetchAdminUseCase: (dependencies: IDependencies) => IFetchAdminUseCase;
    updateProfielUseCase: (dependencies: IDependencies) => IUpdateProfileUseCase;
    addExperienceUseCase: (dependencies: IDependencies) => IAddExperienceUseCase;
    deleteExperienceUseCase: (dependencies: IDependencies) => IDeleteExperienceUseCase;
    editExperienceUseCase: (dependencies: IDependencies) => IEditExperienceUseCase;
    addEducationUseCase: (dependencies: IDependencies) => IAddEducationUseCase;
    editEducationUseCase: (dependencies: IDependencies) => IEditEducationUseCase;
    deleteEducationUseCase: (dependencies: IDependencies) => IDeleteEducationUseCase;
    addSkillUseCase: (dependencies: IDependencies) => IAddSkillCase;
    deleteSkillUseCase: (dependencies: IDependencies) => IDeleteSkillCase;
    deleteLanguageUseCase: (dependencies: IDependencies) => IDeleteLanguageCase;
    addLanguageUseCase: (dependencies: IDependencies) => IAddLanguageCase;
    editSocialLinkUseCase: (dependencies: IDependencies) => ISoclailLinkUseCase
    addResumeUseCase: (dependencies: IDependencies) => IAddResumeUseCase;
    addAddressUseCase: (dependencies: IDependencies) => IAddAddressUseCase;


}