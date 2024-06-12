import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";




export const companyRoutes = (dependencies: IDependencies) => {
    const {
        listUser
    } = controller(dependencies)

    const router = Router()

    

    router.route('/listusers').get(listUser)
  
    return router
}


