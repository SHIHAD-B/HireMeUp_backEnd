"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const listRequestController_1 = require("./listRequestController");
const approveRequestsController_1 = require("./approveRequestsController");
const rejectRequestController_1 = require("./rejectRequestController");
const listCompanyController_1 = require("./listCompanyController");
const blockCompanyController_1 = require("./blockCompanyController");
const unblockCompanyController_1 = require("./unblockCompanyController");
const deleteComapnyController_1 = require("./deleteComapnyController");
const recoverCompanyController_1 = require("./recoverCompanyController");
const fetchCompanyController_1 = require("./fetchCompanyController");
const resetPasswordController_1 = require("./resetPasswordController");
const controller = (dependencies) => {
    return {
        listRequests: (0, listRequestController_1.listRequestController)(dependencies),
        approveRequest: (0, approveRequestsController_1.approveRequestController)(dependencies),
        rejectRequest: (0, rejectRequestController_1.rejectRequestController)(dependencies),
        listCompany: (0, listCompanyController_1.listCompanyController)(dependencies),
        blockCompany: (0, blockCompanyController_1.blockCompanyController)(dependencies),
        unblockCompany: (0, unblockCompanyController_1.unblockCompanyController)(dependencies),
        deleteCompany: (0, deleteComapnyController_1.deleteCompanyController)(dependencies),
        recoverCompany: (0, recoverCompanyController_1.recoverCompanyController)(dependencies),
        fetchCompany: (0, fetchCompanyController_1.fetchCompanyController)(dependencies),
        resetPassword: (0, resetPasswordController_1.resetPasswordController)(dependencies)
    };
};
exports.controller = controller;
