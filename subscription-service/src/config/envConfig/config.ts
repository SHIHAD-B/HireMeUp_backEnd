import dotenv from 'dotenv'

dotenv.config()

const MONGODB_USERNAME: string = String(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD: string = String(process.env.MONGODB_PASSWORD)
const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupSubscriptionService?retryWrites=true&w=majority`
const PORT: number = Number(process.env.PORT)
const JWT_SECRET:string=String(process.env.JWT_SECRET)
const STRIPE_SECRET_KEY:string=String(process.env.STRIPE_SECRET_KEY)
const RABBITMQ_URL:string=String(process.env.RABBITMQ_URL)
const ENCRYPTION_KEY:string=String(process.env.ENCRYPTION_KEY)

export {
    DB_URL,
    PORT,
    JWT_SECRET,
    STRIPE_SECRET_KEY,
    RABBITMQ_URL,
    ENCRYPTION_KEY
}