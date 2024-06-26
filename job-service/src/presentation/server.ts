import express, { Request, Response, Application, NextFunction, urlencoded } from "express";
import { PORT } from "../config/envConfig/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/error/errorHandler";
import { jobRoutes } from "../infrastructure/routes/job.routes";
import { dependencies } from "../config/dependencies";
import { companyRoutes } from "../infrastructure/routes/company.routes";
import { adminRoutes } from "../infrastructure/routes/admin.routes";
import RabbitMQClient from "../infrastructure/rabbitmq/client";


const app: Application = express()
const PORTNUMBER: number = Number(PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/job/user', jobRoutes(dependencies))
app.use('/api/v1/job/company', companyRoutes(dependencies))
app.use('/api/v1/job/admin', adminRoutes(dependencies))

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("api not found : job service")
})

app.use(errorHandler)
app.listen(PORT, async() => {
    console.log(`connected to job service at ${PORTNUMBER}`)
    await RabbitMQClient.getInstance(); 

})

export default app; 