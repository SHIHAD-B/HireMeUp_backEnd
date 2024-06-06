import dotenv from 'dotenv'

dotenv.config()
export const Fron_End_Ip: string = String(process.env.IP)
export const PORT: number = Number(process.env.PORT)
const MONGODB_USERNAME: string = String(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD: string = String(process.env.MONGODB_PASSWORD)
export const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupChatService?retryWrites=true&w=majority`