
import { IDependencies } from "./dependencies";
import {
    IGetMessageUseCase,
    IGetRoomUseCase,
    ISendMessageUseCase,
    IcreateRoomUseCase,
    IListAllMessageUseCase,
    IUpdateReadUseCase
} from '../useCaseInterfaces'

export interface IUseCases {
    sendMessageUseCase: (dependencies: IDependencies) => ISendMessageUseCase
    getRoomUseCase: (dependencies: IDependencies) => IGetRoomUseCase
    getMessageUseCase: (dependencies: IDependencies) => IGetMessageUseCase
    createRoomUseCase: (dependencies: IDependencies) => IcreateRoomUseCase
    listAllMessageUseCase: (dependencies: IDependencies) => IListAllMessageUseCase
    updateReadUseCase: (dependencies: IDependencies) => IUpdateReadUseCase
}