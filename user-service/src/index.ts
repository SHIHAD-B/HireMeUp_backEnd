import server from './presentation/server';
import { PORT } from './config/envConfig/config';
import dbConnection from './infrastructure/database/dbConnection';


(async () => {
    try {
        server;
        console.log(`user Server is running on port ${PORT}`);
    
        await dbConnection()
        .then(() => {
            console.log("user-service is connected to the database");
        })
        .catch(error => {
            console.error("Error connecting to the database:", error);
            throw new Error("Error connecting to the database");
        });
    } catch (error: any) {
        console.error("Issue in running the server:", error);
        throw new Error("Issue in running the server.....");
    }
})();
