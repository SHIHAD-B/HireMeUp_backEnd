
import { ICompanySignin } from "../entities/companySignin.enitity";
import { ICompany } from "../entities";

export interface ICompanySigninUseCase {
    execute(user: ICompanySignin): Promise<ICompany | boolean | null>
}