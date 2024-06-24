import { config } from "dotenv";

config();

export const IP: string = String(process.env.IP);
export const PORT: number = Number(process.env.PORT);
export const JWT_SECRET: string = String(process.env.JWT_SECRET);
export const JWT_REFRESH_SECRET =String(process.env.JWT_REFRESH_SECRET)
export const EMAIL: string = String(process.env.EMAIL);
export const APP_SECRET: string = String(process.env.APP_SECRET);
export const RABBITMQ_URL: string = String(process.env.RABBITMQ_URL);
export const API_SECRET_CLOUDINARY: string = String(process.env.API_SECRET_CLOUDINARY)
export const API_KEY_CLOUDINARY: string = String(process.env.API_KEY_CLOUDINARY)
const MONGODB_USERNAME: string = String(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD: string = String(process.env.MONGODB_PASSWORD)
export const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupAuthService?retryWrites=true&w=majority`