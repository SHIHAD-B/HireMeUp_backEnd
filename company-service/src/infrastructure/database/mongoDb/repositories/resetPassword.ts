import Company from "../model/companySchema"


export const resetPassword = async (email: string, password: string): Promise<boolean | null> => {
    try {
        if (!email || !password) {
            return null
        }
        const user = await Company.findOne({ email: email })
        if (!user) {
            return false
        }

        const reset = await Company.updateOne({ email: email }, { $set: { password: password } })
        
        if (reset.modifiedCount == 1) {
            return true
        }

        return null

    } catch (error: any) {
        console.error('Error resetting company password:', error.message);
        throw new Error('Failed to reset company password.'); 
    }
}