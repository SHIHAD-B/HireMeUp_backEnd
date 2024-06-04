import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";


export const adminRoutes = (dependencies: IDependencies) => {
    const {
        addPlan,
        deletePlan,
        editPlan,
        fetchPlans
    } = controller(dependencies)

    const router = Router()
    router.use(adminAuthMiddleware)

    router.route('/fetchplans').get(fetchPlans)
    router.route('/addplans').post(addPlan)
    router.route('/deleteplan').patch(deletePlan)
    router.route('/editplan').patch(editPlan)

    return router

}