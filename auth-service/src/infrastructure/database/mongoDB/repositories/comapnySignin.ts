import { ICompany } from "../../../../domain/entities";
import { ICompanySignin } from "../../../../domain/entities/companySignin.enitity";
import RabbitMQClient from "../../../rabbitmq/client";
import { compare } from "bcrypt";

export const companySignin = async (data: ICompanySignin): Promise<ICompany | boolean | null> => {
    try {
        let result: ICompany | null = null;
        const client = await RabbitMQClient.getInstance();
        const rawResult:ICompany | unknown = await client.produce(data, "companySignin", "toCompany");

        if (typeof rawResult === 'object' && rawResult !== null) {
            result = rawResult as ICompany;
            if ('password' in result) {
                const isMatch = await compare(data.password, result.password);
                return isMatch ? result : false;
            } else {
                return null;
            }
        }

        return null;
    } catch (error: any) {
        throw new Error(error);
    }
};
