"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Producer {
    constructor(channel, replyQueueName, eventEmitter) {
        this.channel = channel;
        this.replyQueueName = replyQueueName;
        this.eventEmitter = eventEmitter;
    }
    produceMessages(data, operation, toQueue) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = (0, crypto_1.randomUUID)();
            this.channel.sendToQueue(toQueue, Buffer.from(JSON.stringify(data)), {
                replyTo: this.replyQueueName,
                correlationId: uuid,
                expiration: 10,
                headers: {
                    function: operation,
                },
            });
            return new Promise((resolve, reject) => {
                this.eventEmitter.once(uuid, (data) => __awaiter(this, void 0, void 0, function* () {
                    const reply = JSON.parse(data);
                    resolve(reply);
                }));
            });
        });
    }
}
exports.default = Producer;
