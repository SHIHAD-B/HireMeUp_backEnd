import { Router } from "express";
import { IDependencies } from "../../domain/interface";
import { controller } from "../../presentation/controller";
import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";


export const adminRoutes = (dependencies: IDependencies) => {

    const {
        addCategory,
        categoryList,
        deleteCategory,
        editCategory,
        jobList,
        applicantList
    } = controller(dependencies)



    const router = Router()
    router.use(adminAuthMiddleware)

    router.route('/addcategory').post(addCategory)
    router.route('/categorylist').get(categoryList)
    router.route('/deletecategory').patch(deleteCategory)
    router.route('/editcategory').patch(editCategory)
    router.route('/joblist').get(jobList)
    router.route('/applicanlist').get(applicantList)

    return router
}