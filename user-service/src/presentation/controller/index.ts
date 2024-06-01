import { IDependencies } from "../../domain/interfaces";
import { blockUserController } from './blockUserController'
import { deleteUserController } from './deleteUserController'
import { updateUserController } from './updateUserController'
import { fetchUserController } from './fetchUserController'
import { resetPasswordController } from "./resetPasswordController";
import { listUserController } from "./listUserController";
import { unblockUserController } from "./unblockUserController";
import { recoverUserController } from "./recoverUserController";
import { fetchAdminController } from "./fetchAdminController";
import { resetProfilePasswordController } from "./resetProfilePassword";
import { addUserController } from "./addUserController";



export const controller = (dependencies: IDependencies) => {
    
    return {
        blockUser: blockUserController(dependencies),
        unblockUser: unblockUserController(dependencies),
        deleteUser: deleteUserController(dependencies),
        recoverUser: recoverUserController(dependencies),
        updateUser: updateUserController(dependencies),
        fetchUser: fetchUserController(dependencies),
        resetPassword: resetPasswordController(dependencies),
        listUser: listUserController(dependencies),
        fetchAdmin: fetchAdminController(dependencies),
        resetProfilePassword: resetProfilePasswordController(dependencies),
        addUser: addUserController(dependencies)
    }
}

