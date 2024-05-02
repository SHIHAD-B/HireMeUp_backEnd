import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";

export const userRoutes = (dependencies: IDependencies) => {
    const { blockUser, deleteUser, editUser, fetchUser, resetPassword } = controller(dependencies)

    const router = Router()

    router.route('/blockUser/:id').patch(blockUser)
    router.route('/deleteUser/:id').patch(deleteUser)
    router.route('/editUser').patch(editUser)
    router.route('/fetchUser').get(fetchUser)
    router.route('/resetPassword').patch(resetPassword)


    return router
}