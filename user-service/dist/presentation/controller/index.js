"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const blockUserController_1 = require("./blockUserController");
const deleteUserController_1 = require("./deleteUserController");
const updateUserController_1 = require("./updateUserController");
const fetchUserController_1 = require("./fetchUserController");
const resetPasswordController_1 = require("./resetPasswordController");
const listUserController_1 = require("./listUserController");
const unblockUserController_1 = require("./unblockUserController");
const recoverUserController_1 = require("./recoverUserController");
const fetchAdminController_1 = require("./fetchAdminController");
const resetProfilePassword_1 = require("./resetProfilePassword");
const addUserController_1 = require("./addUserController");
const updateProfileController_1 = require("./updateProfileController");
const addExperienceController_1 = require("./addExperienceController");
const deleteExperienceController_1 = require("./deleteExperienceController");
const editExperienceController_1 = require("./editExperienceController");
const addEducationController_1 = require("./addEducationController");
const editEducationController_1 = require("./editEducationController");
const deleteEducationController_1 = require("./deleteEducationController");
const addSkillController_1 = require("./addSkillController");
const deleteSkillController_1 = require("./deleteSkillController");
const addLanguageController_1 = require("./addLanguageController");
const deleteLanguageController_1 = require("./deleteLanguageController");
const editSocialLinkController_1 = require("./editSocialLinkController");
const addResumeController_1 = require("./addResumeController");
const addAddressController_1 = require("./addAddressController");
const addAdminController_1 = require("./addAdminController");
const listAdminController_1 = require("./listAdminController");
const editAdminController_1 = require("./editAdminController");
const blockUnblockAdminController_1 = require("./blockUnblockAdminController");
const controller = (dependencies) => {
    return {
        blockUser: (0, blockUserController_1.blockUserController)(dependencies),
        unblockUser: (0, unblockUserController_1.unblockUserController)(dependencies),
        deleteUser: (0, deleteUserController_1.deleteUserController)(dependencies),
        recoverUser: (0, recoverUserController_1.recoverUserController)(dependencies),
        updateUser: (0, updateUserController_1.updateUserController)(dependencies),
        fetchUser: (0, fetchUserController_1.fetchUserController)(dependencies),
        resetPassword: (0, resetPasswordController_1.resetPasswordController)(dependencies),
        listUser: (0, listUserController_1.listUserController)(dependencies),
        fetchAdmin: (0, fetchAdminController_1.fetchAdminController)(dependencies),
        resetProfilePassword: (0, resetProfilePassword_1.resetProfilePasswordController)(dependencies),
        addUser: (0, addUserController_1.addUserController)(dependencies),
        updateProfile: (0, updateProfileController_1.updateProfileController)(dependencies),
        addExperience: (0, addExperienceController_1.addExperienceController)(dependencies),
        deleteExperience: (0, deleteExperienceController_1.deleteExperienceController)(dependencies),
        editExperience: (0, editExperienceController_1.editExperienceController)(dependencies),
        addEducation: (0, addEducationController_1.addEducationController)(dependencies),
        editEducation: (0, editEducationController_1.editEducationController)(dependencies),
        deleteEducation: (0, deleteEducationController_1.deleteEducationController)(dependencies),
        addSkill: (0, addSkillController_1.addSkillController)(dependencies),
        deleteSkill: (0, deleteSkillController_1.deleteSkillController)(dependencies),
        addLanguage: (0, addLanguageController_1.addLanguageController)(dependencies),
        deleteLanguage: (0, deleteLanguageController_1.deleteLanguageController)(dependencies),
        editSocialLink: (0, editSocialLinkController_1.editSocialLinkController)(dependencies),
        addResume: (0, addResumeController_1.addResumeController)(dependencies),
        addAddress: (0, addAddressController_1.addAddressController)(dependencies),
        addAdmin: (0, addAdminController_1.addAdminController)(dependencies),
        listAdmin: (0, listAdminController_1.listAdminController)(dependencies),
        editAdmin: (0, editAdminController_1.editAdminController)(dependencies),
        blockUnblockAdmin: (0, blockUnblockAdminController_1.blockUnblockAdminController)(dependencies)
    };
};
exports.controller = controller;
