"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const jobRoutes = (dependencies) => {
    const { jobList, categoryList, addApplicant, applicantList, fetchApplicants } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    // router.route('/deleteapplicant').patch(deleteApplicant)
    router.route('/joblist').get(jobList);
    router.route('/categorylist').get(categoryList);
    router.route('/addapplicant').post(addApplicant);
    router.route('/applicantlist').get(applicantList);
    router.route('/fetchapplicants/:id').get(fetchApplicants);
    return router;
};
exports.jobRoutes = jobRoutes;
