import dotenv from 'dotenv'

dotenv.config()

const PORT: number = Number(process.env.PORT)
const MONGODB_USERNAME: string = String(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD: string = String(process.env.MONGODB_PASSWORD)
const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupNotificationService?retryWrites=true&w=majority`
const APP_SECRET: string = String(process.env.APP_SECRET)
const EMAIL: string = String(process.env.EMAIL)
export {
    PORT,
    DB_URL,
    APP_SECRET,
    EMAIL,
}