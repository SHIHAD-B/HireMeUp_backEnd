import { Router } from "express";
import { IDependencies } from "../../domain/interface";
import { controller } from "../../presentation/controller";

export const jobRoutes = (dependencies: IDependencies) => {
    const {
        addCategory,
        addJob,
        addApplicant,
        applicantList,
        categoryList,
        deleteApplicant,
        deleteCategory,
        deleteJob,
        editCategory,
        editJob,
        jobList,
        fetchJob
    } = controller(dependencies)

    const router = Router()

    router.route('/addcategory').post(addCategory)
    router.route('/addjob').post(addJob)
    router.route('/addapplicant').post(addApplicant)
    router.route('/applicantlist').get(applicantList)
    router.route('/categorylist').get(categoryList)
    router.route('/joblist').get(jobList)
    router.route('/deleteapplicant').patch(deleteApplicant)
    router.route('/deletecategory').patch(deleteCategory)
    router.route('/deletejob').patch(deleteJob)
    router.route('/editcategory').patch(editCategory)
    router.route('/editjob').patch(editJob)
    router.route('/fetchjob/:id').get(fetchJob)


    return router
}