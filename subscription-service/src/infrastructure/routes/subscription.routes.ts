import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";

export const subscriptionRoutes = (dependencies: IDependencies) => {
    const {
        fetchPlans,
        addPlan,
        deletePlan,
        editPlan
    } = controller(dependencies)

    const router = Router()

    router.route('/fetchplans').get(fetchPlans)
    router.route('/addplans').post(addPlan)
    router.route('/deleteplan').patch(deletePlan)
    router.route('/editplan').patch(editPlan)
    return router
}