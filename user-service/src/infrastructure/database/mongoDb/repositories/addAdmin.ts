
import { IAdmin } from "../../../../domain/entities";
import Admin from "../model/adminSchema";


export const addAdmin = async (data: IAdmin): Promise<IAdmin | null | boolean> => {
    try {
        if (!data) {
            return null
        } 
        data.role='sub-admin'

        const user = await Admin.findOne({ email: data.email });
        if (user) {
            return false
        }

        const addAdm = await Admin.create(data)

        return addAdm ? addAdm : null


    } catch (error: any) {
        console.error('Error adding skill', error);
        throw new Error('Failed to add skill.');
    }
};
