import { Channel, ConsumeMessage } from "amqplib";
import EventEmitter from "events";

const eventEmitter=new EventEmitter()
export default class Consumer {
  constructor(
    private channel: Channel,
    private replyQueueName: string,
    private eventEmitter: EventEmitter
  ) {}

  async consumeMessages() {
    console.log("Ready to consume messages...");


    this.channel.consume(
      this.replyQueueName,
      (message: ConsumeMessage | null) => {
        if (message !== null) {
          this.eventEmitter.emit(
            message.properties.correlationId.toString(),
            message.content.toString()
          );
       

        } else {
          console.log("No more messages to consume.");
        }
      },
      {
        noAck: true,
      }
    );
  }
}
