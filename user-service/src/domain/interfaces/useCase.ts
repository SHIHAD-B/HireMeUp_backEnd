import { IAddUserUseCase, IBlockUseCase, IDeleteUseCase, IUpdateUserUseCase, IFetchUseCase, IListUseCase, IResetUseCase ,IAddOtpUseCase} from '../useCaseInterface'
import { IDependencies } from './dependencies'

export interface IUseCases {
    addUserUseCase: (dependencies: IDependencies) => IAddUserUseCase;
    blockUserUseCase: (dependencies: IDependencies) => IBlockUseCase;
    deleteUserUseCase: (dependencies: IDependencies) => IDeleteUseCase;
    updateUserUseCase: (dependencies: IDependencies) => IUpdateUserUseCase;
    fetchUserUseCase: (dependencies: IDependencies) => IFetchUseCase;
    listUserUseCase: (dependencies: IDependencies) => IListUseCase;
    resetPasswordUseCase: (dependencies: IDependencies) => IResetUseCase;
    addOtpUseCase:(dependencies: IDependencies) => IAddOtpUseCase
}