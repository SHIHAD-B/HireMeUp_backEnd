import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";

export const companyRoutes = (dependencies: IDependencies) => {
    const { 
        listRequests,
        approveRequest,
        rejectRequest,
        listCompany,
        blockCompany,
        recoverCompany,
        deleteCompany,
        unblockCompany,
        fetchCompany,
        resetPassword
    } = controller(dependencies)

    const router = Router()


    router.route('/fetchrequests').get(listRequests)
    router.route('/approverequest').post(approveRequest)
    router.route('/rejectRequest').post(rejectRequest)
    router.route('/companylist').get(listCompany)
    router.route('/blockcompany').patch(blockCompany)
    router.route('/unblockcompany').patch(unblockCompany)
    router.route('/deletecompany').patch(deleteCompany)
    router.route('/recovercompany').patch(recoverCompany)
    router.route('/fetchcompany').get(fetchCompany)
    router.route('/resetpassword').patch(resetPassword)




    return router
}