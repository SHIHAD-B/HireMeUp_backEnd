import { IUserEntity } from "../../../../domain/entities";
import RabbitMQClient from "../../../rabbitmq/client";
import { compare } from "bcrypt";

export const userSignin = async (data: IUserEntity): Promise<IUserEntity | boolean | null> => {
    try {
        let result: IUserEntity | null = null;
        const client = await RabbitMQClient.getInstance();
        const rawResult = await client.produce(data, "userSignin","toUser");

        if (typeof rawResult === 'object' && rawResult !== null) {
            result = rawResult as IUserEntity;
            let isMatch: boolean = false
            if ('password' in result) {
                isMatch = await compare(data.password, result.password);
                return isMatch ? result : false
            } else {
                return null
            }
        }

        return null
    } catch (error: any) {
        throw new Error(error);
    }
};
