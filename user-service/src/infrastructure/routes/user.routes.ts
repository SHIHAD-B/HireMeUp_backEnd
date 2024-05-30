import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";

export const userRoutes = (dependencies: IDependencies) => {
    const { blockUser,
        deleteUser,
        editUser,
        fetchUser,
        resetPassword,
        listUser,
        unblockUser,
        recoverUser,
        fetchAdmin,
        resetProfilePassword,
        addUser
    } = controller(dependencies)

    const router = Router()

    router.route('/blockUser').patch(blockUser)
    router.route('/unblockUser').patch(unblockUser)
    router.route('/deleteUser').patch(deleteUser)
    router.route('/recoverUser').patch(recoverUser)
    router.route('/editUser').patch(editUser)
    router.route('/fetchUser').get(fetchUser)
    router.route('/resetPassword').patch(resetPassword)
    router.route('/listusers').get(listUser)
    router.route('/fetchadmin').get(fetchAdmin)
    router.route('/profileresetpassword').patch(resetProfilePassword)
    router.route('/addUser').post(addUser)


    return router
}