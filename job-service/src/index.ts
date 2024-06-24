import server from './presentation/server';
import { PORT } from './config/envConfig/config';
import dbConnection from './infrastructure/database/dbConnection';
import cron from 'node-cron'
import { reminderMailer } from './infrastructure/cronJob/remainderMailer';
import { expireInterview } from './infrastructure/cronJob/expireInterview';
import { updateExpiredJobs } from './infrastructure/cronJob/expireJobs';

(async () => {
    try {

        cron.schedule('*/10 * * * *', async () => {
            console.log('Running cron job...');
            try {
                await reminderMailer();
                await expireInterview()
                await updateExpiredJobs()
            } catch (error) {
                console.error('Error running vron job:', error);
            }
        });

        server;
        console.log(`job Server is running on port ${PORT}`);
    
        await dbConnection()
        .then(() => {
            console.log("job-service is connected to the database");
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
