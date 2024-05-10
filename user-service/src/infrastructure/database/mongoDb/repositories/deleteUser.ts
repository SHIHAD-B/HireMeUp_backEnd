
import Users from "../model/userSchema";

export const deleteUser = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
          return null
        }

        const user = await Users.findOne({ email: email })
        if (!user) {
           return null
        }

        const deletedUser = await Users.updateOne({ email: email }, {
            deleted: true,
            blocked: true
        }, { new: true })

        return deletedUser.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user.');
    }

}