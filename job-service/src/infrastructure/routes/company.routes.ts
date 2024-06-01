import { Router } from "express";
import { IDependencies } from "../../domain/interface";
import { controller } from "../../presentation/controller";
import { companyAuthMiddleware } from "../../utils/middlewares/companyAuth";

export const companyRoutes = (dependencies: IDependencies) => {
    const {
        addJob,
        categoryList,
        jobList,
        deleteJob,
        editJob,
        fetchJob
    } = controller(dependencies)

    const router = Router()
    
    router.use(companyAuthMiddleware)
    router.route('/addjob').post(addJob)
    router.route('/categorylist').get(categoryList)
    router.route('/joblist').get(jobList)
    router.route('/deletejob').patch(deleteJob)
    router.route('/editjob').patch(editJob)
    router.route('/fetchjob/:id').get(fetchJob)
   
    return router
}