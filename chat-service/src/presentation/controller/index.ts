import { IDependencies } from "../../domain/interfaces/dependencies"
import { createRoomController } from "./createRoomController"
import { getMessageController } from "./getMessageController"
import { getRoomController } from "./getRoomController"
import { sendMessageController } from "./sendMessageController"
import { listAllMessageController } from "./listAllMessages"


export const controller = (dependencies: IDependencies) => {

    return {
        sendMessage: sendMessageController(dependencies),
        getRoom: getRoomController(dependencies),
        getMessage: getMessageController(dependencies),
        createRoom: createRoomController(dependencies),
        listAllMessage: listAllMessageController(dependencies)
    }
}

