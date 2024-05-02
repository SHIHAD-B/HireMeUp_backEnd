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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const rabbitmq_config_1 = __importDefault(require("./rabbitmq.config"));
const consumer_1 = __importDefault(require("./consumer"));
const producer_1 = __importDefault(require("./producer"));
class RabbitMQClient {
    constructor() { }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield (0, amqplib_1.connect)(rabbitmq_config_1.default.rabbitMQ.url);
                this.producerChannel = yield this.connection.createChannel();
                this.consumerChannel = yield this.connection.createChannel();
                const { queue: authQueue } = yield this.consumerChannel.assertQueue(rabbitmq_config_1.default.rabbitMQ.queues.authQueue, { exclusive: true });
                this.consumer = new consumer_1.default(this.consumerChannel, authQueue);
                this.producer = new producer_1.default(this.producerChannel);
                this.consumer.consumeMessages();
            }
            catch (error) {
                console.log('RabbitMQ error', error);
            }
        });
    }
    produce(data, correlationId, replyTOQueue) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield ((_a = this === null || this === void 0 ? void 0 : this.producer) === null || _a === void 0 ? void 0 : _a.produceMessages(data, correlationId, replyTOQueue));
        });
    }
}
exports.default = RabbitMQClient;
