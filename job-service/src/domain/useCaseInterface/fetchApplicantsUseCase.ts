import { IApplicants } from "../entities";

export interface IFetchApplicants {
    execute(id:string): Promise<IApplicants[] | null>
}