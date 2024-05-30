"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const blockUserController_1 = require("./blockUserController");
const deleteUserController_1 = require("./deleteUserController");
const updateUserController_1 = require("./updateUserController");
const fetchUserController_1 = require("./fetchUserController");
const resetPasswordController_1 = require("./resetPasswordController");
const listUserController_1 = require("./listUserController");
const unblockUserController_1 = require("./unblockUserController");
const recoverUserController_1 = require("./recoverUserController");
const fetchAdminController_1 = require("./fetchAdminController");
const resetProfilePassword_1 = require("./resetProfilePassword");
const addUserController_1 = require("./addUserController");
const controller = (dependencies) => {
    return {
        blockUser: (0, blockUserController_1.blockUserController)(dependencies),
        unblockUser: (0, unblockUserController_1.unblockUserController)(dependencies),
        deleteUser: (0, deleteUserController_1.deleteUserController)(dependencies),
        recoverUser: (0, recoverUserController_1.recoverUserController)(dependencies),
        editUser: (0, updateUserController_1.editUserController)(dependencies),
        fetchUser: (0, fetchUserController_1.fetchUserController)(dependencies),
        resetPassword: (0, resetPasswordController_1.resetPasswordController)(dependencies),
        listUser: (0, listUserController_1.listUserController)(dependencies),
        fetchAdmin: (0, fetchAdminController_1.fetchAdminController)(dependencies),
        resetProfilePassword: (0, resetProfilePassword_1.resetProfilePasswordController)(dependencies),
        addUser: (0, addUserController_1.addUserController)(dependencies)
    };
};
exports.controller = controller;
