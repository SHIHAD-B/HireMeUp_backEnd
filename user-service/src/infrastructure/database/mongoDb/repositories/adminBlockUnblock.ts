
import Admin from "../model/adminSchema";


export const blockUnblockAdmin = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
          return null
        }

        const admin = await Admin.findOne({ email: email })
        if (!admin) {
           return null
        }

        const adminstatus = await Admin.updateOne({ email: email }, {
            blocked:!admin.blocked
        }, { new: true })

        return adminstatus.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error blocking/unblocking admin:', error);
        throw new Error('Failed to block/unblock admin');
    }

}