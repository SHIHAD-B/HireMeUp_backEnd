import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { userAuthMiddleware } from "../../utils/middlewares/userAuth";
import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";



export const userRoutes = (dependencies: IDependencies) => {
    const {
        fetchUser,
        resetPassword,
        resetProfilePassword,
        updateUser,
        listUser
    } = controller(dependencies)

    const router = Router()

    


    router.route('/editUser').patch(userAuthMiddleware, updateUser)
    router.route('/fetchUser').get(userAuthMiddleware, fetchUser)
    router.route('/resetPassword').patch(resetPassword)
    router.route('/listusers').get(listUser)
    router.route('/profileresetpassword').patch(userAuthMiddleware, resetProfilePassword)
  
    return router
}


