"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const userRoutes = (dependencies) => {
    const { listCompany } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/companylist').get(listCompany);
    return router;
};
exports.userRoutes = userRoutes;
