import server from './presentation/server';
import { PORT } from './config/envConfig/config';

(async () => {
    try {
        server;
        console.log(`Server is running on port ${PORT}`);
    } catch (error: any) {
        console.error("Issue in running the server:", error);
        throw new Error("Issue in running the server...");
    }
})();
