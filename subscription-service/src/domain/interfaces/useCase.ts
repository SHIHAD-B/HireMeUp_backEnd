import {
    IFetchsUseCase,
    IAddUseCase,
    IDeleteUseCase,
    IEditUseCase,
    IPlanExistUseCase,
    IupgradeSubscriptionUseCase

} from '../useCaseinterface'

import { IDependencies } from './dependencies'

export interface IUseCases {
    fetchPlansUseCase: (dependencies: IDependencies) => IFetchsUseCase
    addPlansUseCase: (dependencies: IDependencies) => IAddUseCase
    deletePlansUseCase: (dependencies: IDependencies) => IDeleteUseCase
    editPlansUseCase: (dependencies: IDependencies) => IEditUseCase
    PlanExistsUseCase: (dependencies: IDependencies) => IPlanExistUseCase
    upgradeSubscriptionUseCase :(dependencies: IDependencies) =>IupgradeSubscriptionUseCase

}