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
const editCompanyController_1 = require("./editCompanyController");
const companyProfilePasswordReset_1 = require("./companyProfilePasswordReset");
const viewRequestDocument_1 = require("./viewRequestDocument");
const addEmployeeController_1 = require("./addEmployeeController");
const editEmployeeController_1 = require("./editEmployeeController");
const listEmployeeContoller_1 = require("./listEmployeeContoller");
const deleteEmployee_1 = require("./deleteEmployee");
const addCompanyController_1 = require("./addCompanyController");
const editAdCompanyContolroller_1 = require("./editAdCompanyContolroller");
const addContactLinkController_1 = require("./addContactLinkController");
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
        resetPassword: (0, resetPasswordController_1.resetPasswordController)(dependencies),
        editCompany: (0, editCompanyController_1.editCompanyController)(dependencies),
        resetProfilePassword: (0, companyProfilePasswordReset_1.resetProfilePasswordController)(dependencies),
        viewRequestDocument: (0, viewRequestDocument_1.viewRequestDocumentController)(dependencies),
        addEmployee: (0, addEmployeeController_1.addEmployeeController)(dependencies),
        editEmployee: (0, editEmployeeController_1.editEmployeeController)(dependencies),
        listEmployee: (0, listEmployeeContoller_1.listEmployeeController)(dependencies),
        deleteEmployee: (0, deleteEmployee_1.deleteEmployeeController)(dependencies),
        addCompany: (0, addCompanyController_1.addCompanyController)(dependencies),
        editAdCompany: (0, editAdCompanyContolroller_1.editAdCompanyController)(dependencies),
        addContactLinks: (0, addContactLinkController_1.addContactLinksController)(dependencies)
    };
};
exports.controller = controller;
