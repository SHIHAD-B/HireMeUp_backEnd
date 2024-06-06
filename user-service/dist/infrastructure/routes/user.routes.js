"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const userAuth_1 = require("../../utils/middlewares/userAuth");
const userRoutes = (dependencies) => {
    const { fetchUser, resetPassword, resetProfilePassword, updateUser, listUser } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/editUser').patch(userAuth_1.userAuthMiddleware, updateUser);
    router.route('/fetchUser').get(userAuth_1.userAuthMiddleware, fetchUser);
    router.route('/resetPassword').patch(resetPassword);
    router.route('/listusers').get(listUser);
    router.route('/profileresetpassword').patch(userAuth_1.userAuthMiddleware, resetProfilePassword);
    return router;
};
exports.userRoutes = userRoutes;
