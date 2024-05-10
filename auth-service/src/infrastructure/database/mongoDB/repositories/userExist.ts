import RabbitMQClient from "../../../rabbitmq/client"
import { IUserExist, IUsersResult } from "../../../../domain/entities";


export const emailExist = async ({ email, phone }: IUserExist): Promise<IUsersResult | boolean | null> => {
    try {
        const client = await RabbitMQClient.getInstance();

        const data = {
            email: email,
            phone: phone
        }
     
        const result: any = await client.produce(data, "checkEmail", "toUser");
        return result;
    } catch (error: any) {
        throw new Error(error)
    }
}