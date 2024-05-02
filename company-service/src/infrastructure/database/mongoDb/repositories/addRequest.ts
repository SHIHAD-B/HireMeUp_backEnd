import { IRequests } from "../../../../domain/entities";
import Requests from "../model/requestSchema";


export const addRequest = async (data: IRequests): Promise<IRequests | null | false> => {
    try {
        if (!data || !data.email) {
            return null
        } else {

            const requestExist = await Requests.findOne({ email: data.email })
            if (requestExist?.approval == "rejected") {
                return false
            }

            if (requestExist?.status === "secondAttempt") {

                data.approval = "rejected";
                await Requests.updateOne({ email: data.email }, { $set: { approval: "rejected" } });

                return false;
            }


            if (requestExist?.status === "firstAttempt") {
                data.status = "secondAttempt";
            } else {
                data.status = "firstAttempt";
            }

            data.approval = "inProgress";
            const request = await Requests.findOneAndUpdate(
                { email: data.email },
                { $set: data },
                { upsert: true, new: true }
            );
            return request;
        }

    } catch (error: any) {
        console.error('Error adding request:', error);
        throw new Error('Failed to add request..');
    }
}
