import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from "./messageHandler";

export default class Consumer {
  constructor(private channel: Channel, private rpcQueue: string) { }

  async consumeMessages() {
    console.log("Ready to consume messages...");

    this.channel.consume(
      this.rpcQueue,
      async (message: ConsumeMessage | null) => {
        if (message !== null) {
          const { correlationId, replyTo } = message?.properties || {};
          const operation = message?.properties?.headers?.function;
          if (!correlationId || !replyTo) {
            console.log("Missing some properties...");
          }

          const data = JSON.parse(message.content.toString())
          await MessageHandler.handle(
            operation,
            data,
            correlationId,
            replyTo
          );
        }
      },
      {
        noAck: true,
      }
    );
  }
}