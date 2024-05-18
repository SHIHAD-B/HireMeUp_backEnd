import Admin from "../model/adminSchema";
import { IAdmin } from "../../../../domain/entities";
export const fetchAdmin = async (email: string): Promise<IAdmin | null> => {
    try {


        if (!email) {
            return null
        }
        const user: any = await Admin.findOne({ email: email })
        if (!user) {
            return null
        }
        return user
    } catch (error: any) {
        console.error('Error fetching  user:', error);
        throw new Error('Failed to fetch user.');
    }
}