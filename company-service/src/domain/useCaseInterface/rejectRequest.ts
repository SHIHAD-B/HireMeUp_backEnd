import { ICompany } from "../entities";


export interface IRejectRequest {
    execute(data: ICompany): Promise<boolean | null>
}