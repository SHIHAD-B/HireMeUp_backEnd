import {
    IAddRequest,
    IApproveRequest,
    IListCompany,
    IRejectRequest
    , IListRequests,
    IBlockCompanyUseCase,
    IDeleteCompanyUseCase,
    IRecoverCompanyUseCase,
    IUnBlockCompanyUseCase,
    IFetchCompanyUseCase,
    IResetUseCase
} from '../useCaseInterface'

import { IDependencies } from './dependencies'

export interface IUseCase {
    addRequestUseCase: (dependencies: IDependencies) => IAddRequest
    approveRequestUseCase: (dependencies: IDependencies) => IApproveRequest
    rejectRequestUseCase: (dependencies: IDependencies) => IRejectRequest
    listCompanyUseCase: (dependencies: IDependencies) => IListCompany
    listRequestUseCase: (dependencies: IDependencies) => IListRequests
    blockCompanyUseCase: (dependencies: IDependencies) => IBlockCompanyUseCase
    unblockCompanyUseCase: (dependencies: IDependencies) => IUnBlockCompanyUseCase
    deleteCompanyUseCase: (dependencies: IDependencies) => IDeleteCompanyUseCase
    recoverCompanyUseCase: (dependencies: IDependencies) => IRecoverCompanyUseCase
    fetchCompanyUseCase: (dependencies: IDependencies) => IFetchCompanyUseCase
    resetPasswordUseCase :(dependencies: IDependencies) => IResetUseCase
}