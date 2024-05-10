import dotenv from 'dotenv'

dotenv.config()

const MONGODB_USERNAME: string = String(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD: string = String(process.env.MONGODB_PASSWORD)
const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupSubscriptionService?retryWrites=true&w=majority`
const PORT: number = Number(process.env.PORT)

export {
    DB_URL,
    PORT
}