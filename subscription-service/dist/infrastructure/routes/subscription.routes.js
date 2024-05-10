"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const subscriptionRoutes = (dependencies) => {
    const { fetchPlans, addPlan, deletePlan, editPlan } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/fetchplans').get(fetchPlans);
    router.route('/addplans').post(addPlan);
    router.route('/deleteplan').patch(deletePlan);
    router.route('/editplan').patch(editPlan);
    return router;
};
exports.subscriptionRoutes = subscriptionRoutes;
