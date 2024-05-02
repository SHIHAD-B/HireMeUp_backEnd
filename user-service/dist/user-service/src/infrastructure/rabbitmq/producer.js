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
    constructor(channel) {
        this.channel = channel;
    }
    produceMessages(data, corelatiionid, replyTOQueue) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = (0, crypto_1.randomUUID)();
            console.log("corelatiionid", uuid);
            this.channel.sendToQueue(replyTOQueue, Buffer.from(JSON.stringify(data)), {
                correlationId: corelatiionid
            });
        });
    }
}
exports.default = Producer;
