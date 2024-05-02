import { IUserEntity } from "../../../../domain/entities";
import RabbitMQClient from '../../../../infrastructure/rabbitmq/client'



export const userSignup = async (data: IUserEntity): Promise<IUserEntity | any> => {
    try {
        let result = null
        delete data.otp
        const client = await RabbitMQClient.getInstance();
        result = await client.produce(data, "addUser","toUser");

        return result 
    } catch (error: any) {
        throw new Error(error)

    }
}