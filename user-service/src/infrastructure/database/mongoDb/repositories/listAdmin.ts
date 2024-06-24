import Admin from "../model/adminSchema";
import { IAdmin } from "../../../../domain/entities";
export const listAdmin = async (): Promise<IAdmin[] | null> => {
    try {

        const admin: any = await Admin.find({ role:{$ne:"super-admin"}})
        if (!admin) {
            return null
        }
        return admin
    } catch (error: any) {
        console.error('Error listing admin:', error);
        throw new Error('Failed to listing admin.');
    }
}