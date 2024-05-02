import { IDependencies } from "../../domain/interfaces";
import { blockUserController } from './blockUserController'
import { deleteUserController } from './deleteUserController'
import { editUserController } from './updateUserController'
import { fetchUserController } from './fetchUserController'
import { resetPasswordController } from "./resetPasswordController";


export const controller = (dependencies: IDependencies) => {
    return {
        blockUser: blockUserController(dependencies),
        deleteUser: deleteUserController(dependencies),
        editUser: editUserController(dependencies),
        fetchUser: fetchUserController(dependencies),
        resetPassword: resetPasswordController(dependencies)
    }
}
