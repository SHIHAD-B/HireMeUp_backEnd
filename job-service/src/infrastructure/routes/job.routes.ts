import { Router } from "express";
import { IDependencies } from "../../domain/interface";
import { controller } from "../../presentation/controller";
import { userAuthMiddleware } from "../../utils/middlewares/userAuth";

export const jobRoutes = (dependencies: IDependencies) => {
    const {
        jobList,
        categoryList,
        addApplicant,
        applicantList,
        fetchApplicants,
        fetchSchedule
    } = controller(dependencies)

    const router = Router()
 
    
   
   
    // router.route('/deleteapplicant').patch(deleteApplicant)
    
    router.route('/joblist').get(jobList)
    router.route('/categorylist').get(categoryList)
    router.route('/addapplicant').post(addApplicant)
    router.route('/applicantlist').get(applicantList)
    router.route('/fetchapplicants/:id').get(fetchApplicants)
    router.route('/fetchschedule/:id').get(fetchSchedule)
    

    


    return router
}