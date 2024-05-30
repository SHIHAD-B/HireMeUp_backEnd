import Requests from "../model/requestSchema";

export const viewRequestDocument = async (id: string): Promise<boolean | null> => {
    try {
        console.log(id,"id from the front end")
        if (!id) {
            return null;
        }

        const request = await Requests.findOne({ _id: id });
        console.log(request,"data in the view docu")

        if (!request) {
            return null;
        }
       
            const updateResult = await Requests.updateOne({ _id: id }, { $set: { viewdocument: true} });
            if (updateResult.modifiedCount === 1) {
                return true;
            }
        
        return null;
    } catch (error: any) {
        console.error('Error approving request:', error.message);
        throw new Error('Failed to approve request.');
    }
};
