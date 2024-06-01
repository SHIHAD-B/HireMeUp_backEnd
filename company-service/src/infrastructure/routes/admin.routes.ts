import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";

export const adminRoutes=(dependencies:IDependencies)=>{
    const {
        listRequests,
        approveRequest,
        rejectRequest,
        listCompany,
        blockCompany,
        unblockCompany,
        deleteCompany,
        recoverCompany,
        viewRequestDocument,
        editAdCompany,
        addCompany
    }=controller(dependencies)

    const router=Router()
    router.use(adminAuthMiddleware)
    router.route('/fetchrequests').get(listRequests)
    router.route('/approverequest').post(approveRequest)
    router.route('/rejectRequest').post(rejectRequest)
    router.route('/companylist').get(listCompany)
    router.route('/blockcompany').patch(blockCompany)
    router.route('/unblockcompany').patch(unblockCompany)
    router.route('/deletecompany').patch(deleteCompany)
    router.route('/recovercompany').patch(recoverCompany)
    router.route('/viewdocument').patch(viewRequestDocument)
    router.route('/editadcompany').patch(editAdCompany)
    router.route('/addcompany').post(addCompany)
    return router
}