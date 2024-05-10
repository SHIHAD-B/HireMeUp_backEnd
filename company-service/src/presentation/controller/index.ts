import { IDependencies } from "../../domain/interfaces";
import { listRequestController } from "./listRequestController";
import { approveRequestController } from "./approveRequestsController";
import { rejectRequestController } from "./rejectRequestController";
import { listCompanyController } from "./listCompanyController";
import { blockCompanyController } from "./blockCompanyController";
import { unblockCompanyController } from "./unblockCompanyController";
import { deleteCompanyController } from "./deleteComapnyController";
import { recoverCompanyController } from "./recoverCompanyController";
import { fetchCompanyController } from "./fetchCompanyController";
import { resetPasswordController } from "./resetPasswordController";


export const controller = (dependencies: IDependencies) => {
    return {
        listRequests: listRequestController(dependencies),
        approveRequest: approveRequestController(dependencies),
        rejectRequest: rejectRequestController(dependencies),
        listCompany: listCompanyController(dependencies),
        blockCompany: blockCompanyController(dependencies),
        unblockCompany: unblockCompanyController(dependencies),
        deleteCompany: deleteCompanyController(dependencies),
        recoverCompany: recoverCompanyController(dependencies),
        fetchCompany: fetchCompanyController(dependencies),
        resetPassword:resetPasswordController(dependencies)
    }
}
