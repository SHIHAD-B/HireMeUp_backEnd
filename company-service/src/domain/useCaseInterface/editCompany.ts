import { ICompany } from "../entities";

export interface IEditCompanyUseCase {
    execute(data: ICompany): Promise<ICompany | null>
}