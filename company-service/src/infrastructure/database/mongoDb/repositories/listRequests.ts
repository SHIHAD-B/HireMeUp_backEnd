import { IRequests } from "../../../../domain/entities";
import Requests from "../model/requestSchema";

export const listRequest = async (): Promise<IRequests[] | null> => {
    try {
        const requestList = await Requests.find();
        
        if (requestList.length === 0) {
            return null;
        }

        return requestList.reverse();
    } catch (error: any) {
        console.error('Error listing companies:', error.message);
        throw new Error('Failed to list requests.');
    }
};

