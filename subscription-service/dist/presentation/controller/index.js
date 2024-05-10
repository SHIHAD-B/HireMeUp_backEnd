"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const fetchPlansController_1 = require("./fetchPlansController");
const addPlanController_1 = require("./addPlanController");
const deletePlanController_1 = require("./deletePlanController");
const editPlanController_1 = require("./editPlanController");
const controller = (dependencies) => {
    return {
        fetchPlans: (0, fetchPlansController_1.fetchPlansController)(dependencies),
        addPlan: (0, addPlanController_1.addPlansController)(dependencies),
        deletePlan: (0, deletePlanController_1.deletePlanController)(dependencies),
        editPlan: (0, editPlanController_1.editPlanController)(dependencies)
    };
};
exports.controller = controller;
