import { ICompany, IContact, IEmployee } from "../entities";
import { IRequests } from "../entities";

export interface IRepositories {
    addRequest: (data: IRequests) => Promise<IRequests | null | false>
    approveRequest: (data: ICompany) => Promise<boolean | null>
    listCompany: () => Promise<ICompany[] | null>
    rejectRequest: (data: ICompany) => Promise<boolean | null>
    listRequest: () => Promise<IRequests[] | null>
    blockCompany: (email: string) => Promise<boolean | null>
    unblockCompany: (email: string) => Promise<boolean | null>
    deleteCompany: (email: string) => Promise<boolean | null>
    recoverCompany: (email: string) => Promise<boolean | null>
    fetchCompany: (email: string) => Promise<ICompany | null>
    resetPassword: (email: string, password: string) => Promise<boolean | null>
    editCompany: (data: ICompany) => Promise<ICompany | null>
    viewRequestDocument: (id: string,document:string) => Promise<boolean | null>
    listEmployee: () => Promise<IEmployee[] | null>
    editEmployee: (data: IEmployee) => Promise<IEmployee | null | boolean>
    deleteEmployee: (id: string) => Promise<boolean | null>
    addEmployee: (data: IEmployee) => Promise<IEmployee | null | boolean>
    addCompany: (data: ICompany) => Promise<ICompany | null | boolean>
    addContactLinks: (data: IContact) => Promise<ICompany | null | false>

}