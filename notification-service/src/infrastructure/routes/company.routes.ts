import { Router } from "express";
import { controller } from "../../presentation/controller";
import { IDependencies } from "../../domain/interfaces/dependencies";




export const companyRoutes = (dependencies: IDependencies) => {
    const {
        addNofitcation,
        fetchNotification
    } = controller(dependencies)

    const router = Router()

    router.route('/addnotification').post(addNofitcation)
    router.route('/fetchnotification/:id').get(fetchNotification)
  
    return router
}


