import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { userAuthMiddleware } from "../../utils/middlewares/userAuth";


export const userRoutes = (dependencies: IDependencies) => {
    const { listCompany} = controller(dependencies)

    const router = Router()
    router.use(userAuthMiddleware)
    router.route('/companylist').get(listCompany)
    return router
}