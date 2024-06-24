import { IDependencies } from "../../domain/interfaces/dependencies"
import { addNotificationController } from "./addNotificationController"
import { fetchNotificationController } from "./fetchNotification"
import { updateReadStatusController } from "./updateReadStatusController"

export const controller = (dependencies: IDependencies) => {

    return {

        addNofitcation: addNotificationController(dependencies),
        fetchNotification: fetchNotificationController(dependencies),
        updateReadStatus:updateReadStatusController(dependencies)

    }
}