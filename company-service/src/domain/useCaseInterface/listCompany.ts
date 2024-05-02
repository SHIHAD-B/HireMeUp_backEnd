import { ICompany } from "../entities"

export interface IListCompany{
    execute(): Promise<ICompany[] | null>
}