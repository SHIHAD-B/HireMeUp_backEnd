import { IApplicants } from "../entities";

export interface IListApplicants {
    execute(): Promise<IApplicants[] | null>
}