import { ICompany } from "../entities";
import { IRequests } from "../entities";

export interface IRepositories {
    addRequest: (data: IRequests) => Promise<IRequests | null | false>
    approveRequest: (data: ICompany) => Promise<boolean | null>
    listCompany: () => Promise<ICompany[] | null>
    rejectRequest(data: ICompany): Promise<boolean | null>
}