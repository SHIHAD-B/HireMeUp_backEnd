import express, { Request, Response, Application, NextFunction, urlencoded } from "express";
import { PORT } from "../config/envConfig/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/error/errorHandler";
import { subscriptionRoutes } from "../infrastructure/routes/subscription.routes";
import { dependencies } from "../config/dependencies";


const app: Application = express()
const PORTNUMBER: number = Number(PORT)
console.log(PORT,"port number")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use('/', subscriptionRoutes(dependencies))

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("api not found : subscription service")
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`connected to subscription service at ${PORTNUMBER}`)
})

export default app; 