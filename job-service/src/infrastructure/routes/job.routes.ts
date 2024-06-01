import { Router } from "express";
import { IDependencies } from "../../domain/interface";
import { controller } from "../../presentation/controller";
import { userAuthMiddleware } from "../../utils/middlewares/userAuth";

export const jobRoutes = (dependencies: IDependencies) => {
    const {
        jobList,
        categoryList
    } = controller(dependencies)

    const router = Router()
 
    router.use(userAuthMiddleware)
   
   
    // router.route('/addapplicant').post(addApplicant)
    // router.route('/applicantlist').get(applicantList)
    // router.route('/deleteapplicant').patch(deleteApplicant)
    
    router.route('/joblist').get(jobList)
    router.route('/categorylist').get(categoryList)
    


    return router
}