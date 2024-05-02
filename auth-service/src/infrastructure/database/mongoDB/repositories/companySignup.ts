import { ICompany } from '../../../../domain/entities/company.entity';
import RabbitMQClient from '../../../rabbitmq/client'

export const companySignup = async (data: ICompany): Promise<ICompany | any> => {
    try {
        let result = null
        delete data?.otp
        const client = await RabbitMQClient.getInstance();
        result = await client.produce(data, "addRequest","toCompany");

        return result 
    } catch (error: any) {
        throw new Error(error)

    }
}