import mongoose from "mongoose";
import { DB_URL } from "../../config/envConfig/config";

export default async () => {
    try {
        await mongoose.connect(String(DB_URL).trim())
        console.log('🍃🍃🍃user service connected to the database 🍃🍃🍃')
    } catch (error: any) {
        console.log('⛔⛔⛔failed to connect user service database⛔⛔⛔')
        console.log(error)
        process.exit(1)
    }
}