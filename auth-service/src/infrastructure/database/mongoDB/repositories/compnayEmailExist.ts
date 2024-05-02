import RabbitMQClient from "../../../rabbitmq/client"

export const companyEmailExist = async (email: string): Promise<boolean | null> => {
    try {
        const client = await RabbitMQClient.getInstance();

        const data = {
            email: email
        }
        const result = await client.produce(data, "checkEmailcompany","toCompany");
        console.log(result,"return from result")
        return result ? true : false
    } catch (error: any) {
        throw new Error(error)
    }
}