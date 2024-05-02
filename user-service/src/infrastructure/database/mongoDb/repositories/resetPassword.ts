import Users from "../model/userSchema";


export const resetPassword = async (email: string, password: string): Promise<boolean | null> => {
    try {
        if (!email || !password) {
            return null
        }
        const user = await Users.findOne({ email: email })
        if (!user) {
            return false
        }

        const reset = await Users.updateOne({ email: email }, { $set: { password: password } })
        
        if (reset.modifiedCount == 1) {
            return true
        }

        return null

    } catch (error: any) {
        console.error('Error resetting password:', error.message);
        throw new Error('Failed to reset password.'); 
    }
}