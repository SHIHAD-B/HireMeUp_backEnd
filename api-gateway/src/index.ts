import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import proxy from 'express-http-proxy'
import env from 'dotenv'

env.config();
const app: Application = express();
const PORT: number = Number(process.env.PORT || 3000);
const corsOptions = {
    origin: process.env.ORIGIN_URL || 'http://localhost:5173', 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//redirecting the api calls to the respective services

app.use('/auth', proxy(String(process.env.AUTH_IP)))
app.use('/user', proxy(String(process.env.USER_IP)))
app.use('/chat', proxy(String(process.env.CHAT_IP)))
app.use('/notification', proxy(String(process.env.NOTIFICATION_IP)))
app.use('/job', proxy(String(process.env.JOB_IP)))
app.use('/company', proxy(String(process.env.COMPANY_IP)))
app.use('/subscription', proxy(String(process.env.SUBSCRIPTION_IP)))



app.listen(PORT, () => {
    console.log(`API gateway is running... `);
});



