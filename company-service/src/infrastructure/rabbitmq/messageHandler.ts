import RabbitMQClient from "./client";
import { addRequest, checkCompanyExist } from "../database/mongoDb/repositories";


export default class MessageHandler {
  static async handle(operation: string, data: any, correlationId: string, replyTo: string) {
    let response: any = "success";

    switch (operation) {
      case "addRequest":
        response = await addRequest(data);
        break;
      case "checkEmailcompany":
        response = await checkCompanyExist(data.email)
        break;
      case "companySignin":
        response = await checkCompanyExist(data.email)
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
