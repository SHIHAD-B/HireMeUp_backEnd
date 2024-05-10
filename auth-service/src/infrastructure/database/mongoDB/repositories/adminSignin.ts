
import { IAdminEntity } from "../../../../domain/entities";
import RabbitMQClient from "../../../rabbitmq/client";
import { compare } from "bcrypt";

export const adminSignin = async (data: IAdminEntity): Promise<IAdminEntity | boolean | null> => {
    try {
        let result: IAdminEntity | null = null;
        const client = await RabbitMQClient.getInstance();
        const rawResult = await client.produce(data, "adminSignin","toUser");

        if (typeof rawResult === 'object' && rawResult !== null) {
            result = rawResult as IAdminEntity;
            let isMatch: boolean = false
            console.log(result,"result in admin repo")
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
