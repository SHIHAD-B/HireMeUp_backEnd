"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const userRoutes = (dependencies) => {
    const { blockUser, deleteUser, editUser, fetchUser, resetPassword } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/blockUser/:id').patch(blockUser);
    router.route('/deleteUser/:id').patch(deleteUser);
    router.route('/editUser').patch(editUser);
    router.route('/fetchUser').get(fetchUser);
    router.route('/resetPassword').patch(resetPassword);
    return router;
};
exports.userRoutes = userRoutes;
