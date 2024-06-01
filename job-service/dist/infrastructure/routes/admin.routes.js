"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const adminAuth_1 = require("../../utils/middlewares/adminAuth");
const adminRoutes = (dependencies) => {
    const { addCategory, categoryList, deleteCategory, editCategory } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.use(adminAuth_1.adminAuthMiddleware);
    router.route('/addcategory').post(addCategory);
    router.route('/categorylist').get(categoryList);
    router.route('/deletecategory').patch(deleteCategory);
    router.route('/editcategory').patch(editCategory);
    return router;
};
exports.adminRoutes = adminRoutes;
