import dotenv from 'dotenv'

dotenv.config()

export const PORT = Number(process.env.PORT)
const MONGODB_USERNAME = String(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD = String(process.env.MONGODB_PASSWORD)
export const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupJobService?retryWrites=true&w=majority`

