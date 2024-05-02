"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 3000);
const corsOptions = {
    origin: `${process.env.IP}5175`,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('3000', (0, express_http_proxy_1.default)(process.env.ip + "4001"));
app.use('/user', (0, express_http_proxy_1.default)(process.env.IP + "4002"));
app.use('/chat', (0, express_http_proxy_1.default)(process.env.IP + "4003"));
app.use('/notification', (0, express_http_proxy_1.default)(process.env.IP + "4004"));
app.use('/job', (0, express_http_proxy_1.default)(process.env.IP + "4005"));
app.use('/company', (0, express_http_proxy_1.default)(process.env.IP + "4006"));
app.use('/subscription', (0, express_http_proxy_1.default)(process.env.IP + "4007"));
app.listen(PORT, () => {
    console.log(`API gateway is running `);
});
