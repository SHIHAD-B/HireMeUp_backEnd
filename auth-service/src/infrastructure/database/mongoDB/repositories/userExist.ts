import RabbitMQClient from "../../../rabbitmq/client"
import { IUserEntity, IUserExist, IUsersResult } from "../../../../domain/entities";


export const emailExist = async ({ email, phone }: IUserExist): Promise<IUsersResult | boolean | null> => {
    try {
        const client = await RabbitMQClient.getInstance();

        const data = {
            email: email,
            phone: phone
        }

        const result: IUserEntity | unknown = await client.produce(data, "checkEmail", "toUser");
        return result ? result : null;
    } catch (error: any) {
        throw new Error(error)
    }
}