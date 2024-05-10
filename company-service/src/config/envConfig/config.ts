import dotenv from 'dotenv'

dotenv.config()

const PORT: number = Number(process.env.PORT)
const MONGODB_USERNAME: string = String(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD: string = String(process.env.MONGODB_PASSWORD)
const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupCompanyService?retryWrites=true&w=majority`
const RABBITMQ_URL: string = String(process.env.RABBITMQ_URL)
const JWT_SECRET:string=String(process.env.JWT_SECRET)
const EMAIL:string = String(process.env.EMAIL); 
const  APP_SECRET: string = String(process.env.APP_SECRET);


export {
    PORT,
    DB_URL,
    RABBITMQ_URL,
    JWT_SECRET,
    EMAIL,
    APP_SECRET

}