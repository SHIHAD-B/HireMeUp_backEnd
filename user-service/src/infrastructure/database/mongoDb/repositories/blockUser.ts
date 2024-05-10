
import Users from "../model/userSchema";

export const blockUser = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
          return null
        }

        const user = await Users.findOne({ email: email })
        if (!user) {
           return null
        }

        const blockedUser = await Users.updateOne({ email: email }, {
            blocked: true
        }, { new: true })

        return blockedUser.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error blocking user:', error);
        throw new Error('Failed to block user.');
    }

}