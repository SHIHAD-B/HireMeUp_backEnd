import { ICompany } from "../entities"

export interface IFetchCompanyUseCase {
    execute(id: string): Promise<ICompany | null>
}