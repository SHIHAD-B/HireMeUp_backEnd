import express, { Request, Response, Application, NextFunction, urlencoded } from "express";
import { PORT } from "../config/envConfig/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "../utils/error/errorHandler";
import { userRoutes } from "../infrastructure/routes/user.routes";
import { companyRoutes } from "../infrastructure/routes/company.routes";
import { dependencies } from "../config/dependencies";
import http from 'http'
import connectSocketIo from "../infrastructure/socket/socket";



const app: Application = express()
const PORTNUMBER: number = Number(PORT)
const server = http.createServer(app);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use("/connect", (req, res) => {
//     connectSocketIo(server);
//   });


app.use('/user', userRoutes(dependencies))
app.use('/company', companyRoutes(dependencies))
connectSocketIo(server)


app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("api not found : chat service")
})
  

app.use(errorHandler)
server.listen(PORT, () => {
    console.log(`connected to chat service at ${PORTNUMBER}`)

})

export default app; 

