import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { userAuthMiddleware } from "../../utils/middlewares/userAuth";




export const userRoutes = (dependencies: IDependencies) => {
    const {
        fetchUser,
        resetPassword,
        resetProfilePassword,
        updateUser,
        listUser,
        updateProfile,
        addExperience,
        deleteExperience,
        editExperience,
        addEducation,
        deleteEducation,
        editEducation,
        addSkill,
        deleteSkill,
        addLanguage,
        deleteLanguage,
        editSocialLink,
        addResume,
        addAddress
    } = controller(dependencies)

    const router = Router()




    router.route('/editUser').patch(userAuthMiddleware, updateUser)
    router.route('/fetchUser').get(userAuthMiddleware, fetchUser)
    router.route('/resetPassword').patch(resetPassword)
    router.route('/listusers').get(listUser)
    router.route('/profileresetpassword').patch(userAuthMiddleware, resetProfilePassword)
    router.route('/updateprofile').patch(userAuthMiddleware, updateProfile)
    router.route('/addexperience').patch(userAuthMiddleware,addExperience)
    router.route('/deleteexperience').patch(userAuthMiddleware,deleteExperience)
    router.route('/editexperience').patch(userAuthMiddleware,editExperience)
    router.route('/addeducation').patch(userAuthMiddleware,addEducation)
    router.route('/editeducation').patch(userAuthMiddleware,editEducation)
    router.route('/deleteeducation').patch(userAuthMiddleware,deleteEducation)
    router.route('/addskill').patch(userAuthMiddleware,addSkill)
    router.route('/deleteskill').patch(userAuthMiddleware,deleteSkill)
    router.route('/addlanguage').patch(userAuthMiddleware,addLanguage)
    router.route('/deletelanguage').patch(userAuthMiddleware,deleteLanguage)
    router.route('/editsociallink').patch(userAuthMiddleware,editSocialLink)
    router.route('/addresume').patch(userAuthMiddleware,addResume)
    router.route('/addaddress').patch(userAuthMiddleware,addAddress)



    return router
}


