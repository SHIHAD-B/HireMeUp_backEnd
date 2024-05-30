import server from './presentation/server';
import { PORT } from './config/envConfig/config';
import dbConnection from './infrastructure/database/dbConnection';

(async () => {
    try {
        server;
        console.log(`company Server is running on port ${PORT}`);
        await dbConnection()
        .catch((error:any)=>{
            if(error){
                console.log(error)
            }
            console.log(`company service is connected the database`)
        })
    } catch (error: any) {
        console.error("Issue in running the server:", error);
        throw new Error("Issue in running the server....");
    }
})();
