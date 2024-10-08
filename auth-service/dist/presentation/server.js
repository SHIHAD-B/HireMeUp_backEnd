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
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/envConfig/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("../utils/error/errorHandler");
const auth_routes_1 = require("../infrastructure/routes/auth.routes");
const dependencies_1 = require("../config/dependencies");
const client_1 = __importDefault(require("../infrastructure/rabbitmq/client"));
const app = (0, express_1.default)();
const PORTNUMBER = Number(config_1.PORT);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/auth/cus', (0, auth_routes_1.authRoutes)(dependencies_1.dependencies));
app.use("*", (req, res, next) => {
    res.status(404).send("api not found: auth service");
});
app.use(errorHandler_1.errorHandler);
app.listen(config_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`connected to auth service at ${PORTNUMBER}`);
    yield client_1.default.getInstance();
}));
exports.default = app;
