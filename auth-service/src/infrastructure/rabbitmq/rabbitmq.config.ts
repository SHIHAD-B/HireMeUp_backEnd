import { RABBITMQ_URL } from "../../config/envConfig/config";

export default {
    rabbitMQ: {
        url: RABBITMQ_URL,
        queues: {
            authQueue: "authQueue",
            userQueue: "userQueue",
            companyQueue: "companyQueue"
        },
    },
};