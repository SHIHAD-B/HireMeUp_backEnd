"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const fetchPlansController_1 = require("./fetchPlansController");
const addPlanController_1 = require("./addPlanController");
const deletePlanController_1 = require("./deletePlanController");
const editPlanController_1 = require("./editPlanController");
const checkoutSubscription_1 = require("./checkoutSubscription");
const addSubscriptionController_1 = require("./addSubscriptionController");
const controller = (dependencies) => {
    return {
        fetchPlans: (0, fetchPlansController_1.fetchPlansController)(dependencies),
        addPlan: (0, addPlanController_1.addPlansController)(dependencies),
        deletePlan: (0, deletePlanController_1.deletePlanController)(dependencies),
        editPlan: (0, editPlanController_1.editPlanController)(dependencies),
        checkoutSubscription: (0, checkoutSubscription_1.checkoutSubscriptionController)(dependencies),
        addSubscription: (0, addSubscriptionController_1.addSubscriptionController)(dependencies)
    };
};
exports.controller = controller;
