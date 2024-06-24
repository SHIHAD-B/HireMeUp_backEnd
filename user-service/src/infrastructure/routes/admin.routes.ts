import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";



export const adminRoutes = (dependencies: IDependencies) => {


    const {
        updateUser,
        addUser,
        blockUser,
        unblockUser,
        deleteUser,
        recoverUser,
        fetchAdmin,
        listUser,
        addAdmin,
        editAdmin,
        listAdmin,
        blockUnblockAdmin
    } = controller(dependencies)

    const router = Router()

    router.use(adminAuthMiddleware)

    router.route('/editUser').patch(updateUser)
    router.route('/blockUser').patch(blockUser)
    router.route('/unblockUser').patch(unblockUser)
    router.route('/deleteUser').patch(deleteUser)
    router.route('/recoverUser').patch(recoverUser)
    router.route('/listusers').get(listUser)
    router.route('/fetchadmin').get(fetchAdmin)
    router.route('/addUser').post(addUser)
    router.route('/addadmin').post(addAdmin)
    router.route('/editadmin').patch(editAdmin)
    router.route('/listadmin').get(listAdmin)
    router.route('/blockunblockadmin').patch(blockUnblockAdmin)
    return router

}