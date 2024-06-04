import express, { Request, Response, Application, NextFunction, urlencoded } from "express";
import { PORT } from "../config/envConfig/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/error/errorHandler";
import { subscriptionRoutes } from "../infrastructure/routes/subscription.routes";
import { dependencies } from "../config/dependencies";
import { adminRoutes } from "../infrastructure/routes/admin.routes";
import path from "path"
import RabbitMQClient from "../infrastructure/rabbitmq/client";


const app: Application = express()
const PORTNUMBER: number = Number(PORT)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(express.static(path.join(__dirname, '../public')));
app.use('/user', subscriptionRoutes(dependencies))
app.use('/admin', adminRoutes(dependencies))

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("api not found : subscription service")
})

app.use(errorHandler)
app.listen(PORT, async () => {
    console.log(`connected to subscription service at ${PORTNUMBER}`);
    await RabbitMQClient.getInstance(); 
});

export default app; 