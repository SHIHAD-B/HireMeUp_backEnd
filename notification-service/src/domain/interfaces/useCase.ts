import { IDependencies } from "./dependencies";

import {
    IAddNotificationUseCase,
    IFetchNotificationUseCase,
    IUpdateReadStatusUseCase
} from "../useCaseInterfaces";


export interface IUseCases {
    addNotificationUseCase: (dependencies: IDependencies) => IAddNotificationUseCase
    fetchNotificationUseCase: (dependencies: IDependencies) => IFetchNotificationUseCase
    updateReadStatusUseCase: (dependencies: IDependencies) => IUpdateReadStatusUseCase
}