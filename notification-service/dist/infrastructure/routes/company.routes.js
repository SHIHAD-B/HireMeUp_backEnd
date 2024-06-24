"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const companyRoutes = (dependencies) => {
    const { addNofitcation, fetchNotification } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/addnotification').post(addNofitcation);
    router.route('/fetchnotification/:id').get(fetchNotification);
    return router;
};
exports.companyRoutes = companyRoutes;
