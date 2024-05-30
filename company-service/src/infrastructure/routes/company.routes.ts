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
        resetPassword,
        editCompany,
        resetProfilePassword,
        viewRequestDocument,
        addEmployee,
        deleteEmployee,
        editEmployee,
        listEmployee,
        addCompany,
        editAdCompany
    } = controller(dependencies)

    const router = Router()


    router.route('/fetchrequests').get(listRequests)
    router.route('/resetprofilepassword').patch(resetProfilePassword)
    router.route('/approverequest').post(approveRequest)
    router.route('/rejectRequest').post(rejectRequest)
    router.route('/companylist').get(listCompany)
    router.route('/blockcompany').patch(blockCompany)
    router.route('/unblockcompany').patch(unblockCompany)
    router.route('/deletecompany').patch(deleteCompany)
    router.route('/recovercompany').patch(recoverCompany)
    router.route('/fetchcompany').get(fetchCompany)
    router.route('/resetpassword').patch(resetPassword)
    router.route('/editcompany').patch(editCompany)
    router.route('/viewdocument').patch(viewRequestDocument)
    router.route('/listemployee').get(listEmployee)
    router.route('/addemployee').post(addEmployee)
    router.route('/editemployee').patch(editEmployee)
    router.route('/deleteemployee').patch(deleteEmployee)
    router.route('/addcompany').post(addCompany)
    router.route('/editadcompany').patch(editAdCompany)




    return router
}