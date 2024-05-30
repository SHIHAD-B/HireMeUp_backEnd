"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const userRoutes = (dependencies) => {
    const { blockUser, deleteUser, editUser, fetchUser, resetPassword, listUser, unblockUser, recoverUser, fetchAdmin, resetProfilePassword, addUser } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/blockUser').patch(blockUser);
    router.route('/unblockUser').patch(unblockUser);
    router.route('/deleteUser').patch(deleteUser);
    router.route('/recoverUser').patch(recoverUser);
    router.route('/editUser').patch(editUser);
    router.route('/fetchUser').get(fetchUser);
    router.route('/resetPassword').patch(resetPassword);
    router.route('/listusers').get(listUser);
    router.route('/fetchadmin').get(fetchAdmin);
    router.route('/profileresetpassword').patch(resetProfilePassword);
    router.route('/addUser').post(addUser);
    return router;
};
exports.userRoutes = userRoutes;
