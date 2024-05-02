"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../auth-service/src/config/envConfig/config");
exports.default = {
    rabbitMQ: {
        url: config_1.RABBITMQ_URL,
        queues: {
            authQueue: "authQueue"
        },
    },
};
