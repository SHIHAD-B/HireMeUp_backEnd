import express, { Request, Response, Application, NextFunction, urlencoded } from "express";
import { PORT } from "../config/envConfig/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/error/errorHandler";
import { userRoutes } from "../infrastructure/routes/user.routes";
import { dependencies } from "../config/dependencies";
import RabbitMQClient from "../infrastructure/rabbitmq/client";
import { adminRoutes } from "../infrastructure/routes/admin.routes";
import { companyRoutes } from "../infrastructure/routes/company.routes";


const app: Application = express()
const PORTNUMBER: number = Number(PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/v1/user', userRoutes(dependencies))
app.use('/api/v1/user/company', companyRoutes(dependencies))
app.use('/api/v1/user/admin', adminRoutes(dependencies))


app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("api not found : user service")
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`connected to user service at ${PORTNUMBER}`)
    const rabbitMQClient = RabbitMQClient.getInstance();
    rabbitMQClient.initialize();
})

export default app; 