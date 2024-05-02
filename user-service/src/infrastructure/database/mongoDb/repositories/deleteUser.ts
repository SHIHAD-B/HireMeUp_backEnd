
import Users from "../model/userSchema";

export const deleteUser = async (id: string): Promise<boolean | null> => {
    try {
        if (!id) {
          return null
        }

        const user = await Users.findOne({ _id: id })
        if (!user) {
           return null
        }

        const deletedUser = await Users.updateOne({ _id: id }, {
            deleted: true,
            blocked: true
        }, { new: true })

        return deletedUser.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user.');
    }

}