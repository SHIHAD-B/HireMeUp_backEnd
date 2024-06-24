import { Router } from "express";
import { controller } from "../../presentation/controller";
import { IDependencies } from "../../domain/interfaces/dependencies";




export const userRoutes = (dependencies: IDependencies) => {
    const {
        fetchNotification,
        updateReadStatus
    } = controller(dependencies)

    const router = Router()

    router.route('/fetchnotification/:id').get(fetchNotification)
    router.route('/updatereadstatus').patch(updateReadStatus)
  
    return router
}


