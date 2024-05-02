"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const blockUserController_1 = require("./blockUserController");
const deleteUserController_1 = require("./deleteUserController");
const updateUserController_1 = require("./updateUserController");
const fetchUserController_1 = require("./fetchUserController");
const resetPasswordController_1 = require("./resetPasswordController");
const controller = (dependencies) => {
    return {
        blockUser: (0, blockUserController_1.blockUserController)(dependencies),
        deleteUser: (0, deleteUserController_1.deleteUserController)(dependencies),
        editUser: (0, updateUserController_1.editUserController)(dependencies),
        fetchUser: (0, fetchUserController_1.fetchUserController)(dependencies),
        resetPassword: (0, resetPasswordController_1.resetPasswordController)(dependencies)
    };
};
exports.controller = controller;
