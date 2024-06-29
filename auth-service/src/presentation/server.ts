import express, { Application, NextFunction, Request, Response } from "express";
import { PORT } from "../config/envConfig/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/error/errorHandler";
import { authRoutes } from "../infrastructure/routes/auth.routes";
import { dependencies } from "../config/dependencies";
import RabbitMQClient from "../infrastructure/rabbitmq/client";


const app: Application = express()
const PORTNUMBER: number = Number(PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/auth/cus', authRoutes(dependencies))

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("api not found: auth service")
})


app.use(errorHandler)

app.listen(PORT, async () => {
    console.log(`connected to auth service at ${PORTNUMBER}`);
    await RabbitMQClient.getInstance(); 
});

export default app; 