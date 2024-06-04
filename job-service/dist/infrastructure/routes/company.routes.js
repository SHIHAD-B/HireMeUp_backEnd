"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const companyAuth_1 = require("../../utils/middlewares/companyAuth");
const companyRoutes = (dependencies) => {
    const { addJob, categoryList, jobList, deleteJob, editJob, fetchJob } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.use(companyAuth_1.companyAuthMiddleware);
    router.route('/addjob').post(addJob);
    router.route('/categorylist').get(categoryList);
    router.route('/joblist').get(jobList);
    router.route('/deletejob').patch(deleteJob);
    router.route('/editjob').patch(editJob);
    router.route('/fetchjob/:id').get(fetchJob);
    return router;
};
exports.companyRoutes = companyRoutes;