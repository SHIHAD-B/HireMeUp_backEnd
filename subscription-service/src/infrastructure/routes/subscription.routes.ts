import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { userAuthMiddleware } from "../../utils/middlewares/userAuth";


export const subscriptionRoutes = (dependencies: IDependencies) => {
    const {
        fetchPlans,
        checkoutSubscription,
        addSubscription
    } = controller(dependencies)
    const router = Router()
    // router.use(userAuthMiddleware)

    router.route('/fetchplans').get(fetchPlans)
    router.route('/checkoutsubscription').post(checkoutSubscription)
    router.route('/addSubscription').post(addSubscription)

    return router
}