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

app.use('/auth', proxy(process.env.IP + "4001"))
app.use('/user', proxy(process.env.IP + "4002"))
app.use('/chat', proxy(process.env.IP + "4003"))
app.use('/notification', proxy(process.env.IP + "4004"))
app.use('/job', proxy(process.env.IP + "4005"))
app.use('/company', proxy(process.env.IP + "4006"))
app.use('/subscription', proxy(process.env.IP + "4007"))



app.listen(PORT, () => {
    console.log(`API gateway is running..... `);
});



