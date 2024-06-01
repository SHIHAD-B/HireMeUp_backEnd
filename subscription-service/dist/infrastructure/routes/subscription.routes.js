"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const userAuth_1 = require("../../utils/middlewares/userAuth");
const subscriptionRoutes = (dependencies) => {
    const { fetchPlans, } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.use(userAuth_1.userAuthMiddleware);
    router.route('/fetchplans').get(fetchPlans);
    return router;
};
exports.subscriptionRoutes = subscriptionRoutes;
