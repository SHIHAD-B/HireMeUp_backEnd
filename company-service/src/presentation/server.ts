import express, { Request, Response, Application, NextFunction } from "express";
import { PORT } from "../config/envConfig/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/error/errorHandler";
import { companyRoutes } from "../infrastructure/routes/company.routes";
import { dependencies } from "../config/dependencies";
import RabbitMQClient from "../infrastructure/rabbitmq/client";
import { adminRoutes } from "../infrastructure/routes/admin.routes";
import { userRoutes } from "../infrastructure/routes/user.routes";


const app: Application = express()
const PORTNUMBER: number = Number(PORT)

app.use(express.json({limit:'150mb'}))
app.use(express.urlencoded({limit:'150mb', extended: true }))
app.use(cookieParser())



app.use('/api/v1/company/company', companyRoutes(dependencies))
app.use('/api/v1/company/admin', adminRoutes(dependencies))
app.use('/api/v1/company/user', userRoutes(dependencies))

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("api not found: company service")
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`connected to company service at ${PORTNUMBER}`)
    const rabbitMQClient = RabbitMQClient.getInstance();
    rabbitMQClient.initialize();
})

export default app; 