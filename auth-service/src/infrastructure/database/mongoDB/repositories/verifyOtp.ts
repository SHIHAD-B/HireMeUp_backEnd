import RabbitMQClient from "../../../rabbitmq/client"

export const verifyOtp = async (email: string, otp: string): Promise<boolean | any> => {
    try {
        let result = null
        const data = {
            email: email,
            otp: otp
        }

        const client = await RabbitMQClient.getInstance();
        result = await client.produce(data, "checkOtp","toUser");

        return result ? true : false

    } catch (error: any) {
        throw new Error(error)
    }
}