import { ICompany } from "../entities";
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
}