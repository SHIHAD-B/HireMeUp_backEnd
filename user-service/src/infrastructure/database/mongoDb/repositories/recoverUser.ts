
import Users from "../model/userSchema";

export const recoverUser = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
          return null
        }

        const user = await Users.findOne({ email: email })
        if (!user) {
           return null
        }

        const deletedUser = await Users.updateOne({ email: email }, {
            deleted: false,
            blocked: false
        }, { new: true })

        return deletedUser.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error recovering user:', error);
        throw new Error('Failed to recover user.');
    }

}