import { ICompany } from "../entities";

export interface IApproveRequest {
    execute(data: ICompany): Promise<boolean | null>
}