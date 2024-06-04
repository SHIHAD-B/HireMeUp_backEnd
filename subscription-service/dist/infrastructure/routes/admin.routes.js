"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const adminAuth_1 = require("../../utils/middlewares/adminAuth");
const adminRoutes = (dependencies) => {
    const { addPlan, deletePlan, editPlan, fetchPlans } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.use(adminAuth_1.adminAuthMiddleware);
    router.route('/fetchplans').get(fetchPlans);
    router.route('/addplans').post(addPlan);
    router.route('/deleteplan').patch(deletePlan);
    router.route('/editplan').patch(editPlan);
    return router;
};
exports.adminRoutes = adminRoutes;
