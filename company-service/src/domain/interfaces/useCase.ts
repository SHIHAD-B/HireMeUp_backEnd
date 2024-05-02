import { IAddRequest, IApproveRequest, IListCompany, IRejectRequest } from '../useCaseInterface'
import { IDependencies } from './dependencies'

export interface IUseCase {
    addRequestUseCase: (dependencies: IDependencies) => IAddRequest
    approveRequestUseCase: (dependencies: IDependencies) => IApproveRequest
    rejectRequestUseCase: (dependencies: IDependencies) => IRejectRequest
    listCompanyUseCase: (dependencies: IDependencies) => IListCompany
}