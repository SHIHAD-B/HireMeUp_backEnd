import { ICompany } from "../entities/company.entity"

export interface ICompanySignupUseCase {
    execute(user: ICompany): Promise<ICompany | null>
}