import { Router } from "express";
import { IDependencies } from "../../domain/interfaces";
import { controller } from "../../presentation/controller";
import { companyAuthMiddleware } from "../../utils/middlewares/companyAuth";

export const companyRoutes = (dependencies: IDependencies) => {
    const {
        fetchCompany,
        resetPassword,
        editCompany,
        resetProfilePassword,
        addEmployee,
        deleteEmployee,
        editEmployee,
        listEmployee,
        addContactLinks
    } = controller(dependencies)

    const router = Router()
  
    router.route('/resetprofilepassword').patch(companyAuthMiddleware, resetProfilePassword)
    router.route('/fetchcompany').get(fetchCompany)
    router.route('/resetpassword').patch(resetPassword)
    router.route('/editcompany').patch(companyAuthMiddleware, editCompany)
    router.route('/listemployee').get(companyAuthMiddleware, listEmployee)
    router.route('/addemployee').post(companyAuthMiddleware, addEmployee)
    router.route('/editemployee').patch(companyAuthMiddleware, editEmployee)
    router.route('/deleteemployee').patch(companyAuthMiddleware, deleteEmployee)
    router.route('/addcontactlinks').patch(companyAuthMiddleware, addContactLinks)


    return router
}