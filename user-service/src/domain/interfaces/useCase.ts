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
    IFetchAdminUseCase
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
}