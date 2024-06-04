"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const subscriptionRoutes = (dependencies) => {
    const { fetchPlans, checkoutSubscription, addSubscription } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    // router.use(userAuthMiddleware)
    router.route('/fetchplans').get(fetchPlans);
    router.route('/checkoutsubscription').post(checkoutSubscription);
    router.route('/addSubscription').post(addSubscription);
    return router;
};
exports.subscriptionRoutes = subscriptionRoutes;
