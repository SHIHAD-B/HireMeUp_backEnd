import { IDependencies } from "../../domain/interfaces";
import { blockUserController } from './blockUserController'
import { deleteUserController } from './deleteUserController'
import { updateUserController } from './updateUserController'
import { fetchUserController } from './fetchUserController'
import { resetPasswordController } from "./resetPasswordController";
import { listUserController } from "./listUserController";
import { unblockUserController } from "./unblockUserController";
import { recoverUserController } from "./recoverUserController";
import { fetchAdminController } from "./fetchAdminController";
import { resetProfilePasswordController } from "./resetProfilePassword";
import { addUserController } from "./addUserController";
import { updateProfileController } from "./updateProfileController";
import { addExperienceController } from "./addExperienceController";
import { deleteExperienceController } from './deleteExperienceController'
import { editExperienceController } from './editExperienceController'
import { addEducationController } from "./addEducationController";
import { editEducationController } from "./editEducationController";
import { deleteEducationController } from "./deleteEducationController";
import { addSkillController } from "./addSkillController";
import { deleteSkillController } from "./deleteSkillController";
import { addLanguageController } from "./addLanguageController";
import { deleteLanguageController } from "./deleteLanguageController";
import { editSocialLinkController } from "./editSocialLinkController";
import { addResumeController } from "./addResumeController";
import { addAddressController } from "./addAddressController";

export const controller = (dependencies: IDependencies) => {

    return {
        blockUser: blockUserController(dependencies),
        unblockUser: unblockUserController(dependencies),
        deleteUser: deleteUserController(dependencies),
        recoverUser: recoverUserController(dependencies),
        updateUser: updateUserController(dependencies),
        fetchUser: fetchUserController(dependencies),
        resetPassword: resetPasswordController(dependencies),
        listUser: listUserController(dependencies),
        fetchAdmin: fetchAdminController(dependencies),
        resetProfilePassword: resetProfilePasswordController(dependencies),
        addUser: addUserController(dependencies),
        updateProfile: updateProfileController(dependencies),
        addExperience: addExperienceController(dependencies),
        deleteExperience: deleteExperienceController(dependencies),
        editExperience: editExperienceController(dependencies),
        addEducation: addEducationController(dependencies),
        editEducation: editEducationController(dependencies),
        deleteEducation: deleteEducationController(dependencies),
        addSkill: addSkillController(dependencies),
        deleteSkill: deleteSkillController(dependencies),
        addLanguage: addLanguageController(dependencies),
        deleteLanguage: deleteLanguageController(dependencies),
        editSocialLink: editSocialLinkController(dependencies),
        addResume: addResumeController(dependencies),
        addAddress:addAddressController(dependencies)

    }
}

