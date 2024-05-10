import {
    IFetchsUseCase,
    IAddUseCase,
    IDeleteUseCase,
    IEditUseCase,
    IPlanExistUseCase

} from '../useCaseinterface'

import { IDependencies } from './dependencies'

export interface IUseCases {
    fetchPlansUseCase: (dependencies: IDependencies) => IFetchsUseCase
    addPlansUseCase: (dependencies: IDependencies) => IAddUseCase
    deletePlansUseCase: (dependencies: IDependencies) => IDeleteUseCase
    editPlansUseCase: (dependencies: IDependencies) => IEditUseCase
    PlanExistsUseCase: (dependencies: IDependencies) => IPlanExistUseCase

}