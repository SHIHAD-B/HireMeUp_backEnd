"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const addCategoryController_1 = require("./addCategoryController");
const addJobController_1 = require("./addJobController");
const addApplicantController_1 = require("./addApplicantController");
const editCategoryController_1 = require("./editCategoryController");
const editJobController_1 = require("./editJobController");
const deleteApplicantController_1 = require("./deleteApplicantController");
const deleteCategoryContoller_1 = require("./deleteCategoryContoller");
const deleteJobController_1 = require("./deleteJobController");
const jobListController_1 = require("./jobListController");
const applicantListController_1 = require("./applicantListController");
const categoryListController_1 = require("./categoryListController");
const fetchJobController_1 = require("./fetchJobController");
const fetchApplicantsController_1 = require("./fetchApplicantsController");
const updateStatusController_1 = require("./updateStatusController");
const controller = (dependencies) => {
    return {
        addCategory: (0, addCategoryController_1.addCategoryController)(dependencies),
        addJob: (0, addJobController_1.addJobController)(dependencies),
        addApplicant: (0, addApplicantController_1.addApplicantController)(dependencies),
        editCategory: (0, editCategoryController_1.editCategoryController)(dependencies),
        editJob: (0, editJobController_1.editJobController)(dependencies),
        deleteApplicant: (0, deleteApplicantController_1.deleteApplicantController)(dependencies),
        deleteCategory: (0, deleteCategoryContoller_1.deleteCategoryController)(dependencies),
        deleteJob: (0, deleteJobController_1.deleteJobController)(dependencies),
        jobList: (0, jobListController_1.jobListController)(dependencies),
        applicantList: (0, applicantListController_1.applicantListController)(dependencies),
        categoryList: (0, categoryListController_1.categoryListController)(dependencies),
        fetchJob: (0, fetchJobController_1.fetchJobController)(dependencies),
        fetchApplicants: (0, fetchApplicantsController_1.fetchApplicantsController)(dependencies),
        updateStatus: (0, updateStatusController_1.updateStatusController)(dependencies)
    };
};
exports.controller = controller;
