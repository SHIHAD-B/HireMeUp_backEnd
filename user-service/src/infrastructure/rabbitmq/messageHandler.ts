import RabbitMQClient from "./client";
import { addUser, checkOtp, fetchUser, addOtp } from "../database/mongoDb/repositories";


export default class MessageHandler {
  static async handle(operation: string, data: any, correlationId: string, replyTo: string) {
    let response: any = "success";

    switch (operation) {
      case "addUser":
        response = await addUser(data);
        break;
      case "checkEmail":
        response = await fetchUser(data.email);
        break;
      case "checkOtp":
        response = await checkOtp(data.email, data.otp)
        break;
      case "addOtp":
        response = await addOtp(data.email, data.otp)
        break;
        case "userSignin":
          response= await fetchUser(data.email)
          break;
      default:
        response = { success: false, error: "Unknown operation" };
        console.log("Unknown operation:", operation);
        break;
    }


    const rabbitMQClient = RabbitMQClient.getInstance();

    await rabbitMQClient.produce(response, correlationId, replyTo);
  }
}
