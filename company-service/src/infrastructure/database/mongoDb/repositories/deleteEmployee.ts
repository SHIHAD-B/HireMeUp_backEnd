import Employee from "../model/employeeSchema"

export const deleteEmployee = async (email: string): Promise<boolean | null> => {
    try {
        if (!email) {
            return null
        }

        const employee = await Employee.findOne({ email: email })
        if (!employee) {
            return null
        }

        const blockedEmployee = await Employee.updateOne({ email: email }, {
            isActive: false,
            deleted: true
        }, { new: true })

        return blockedEmployee.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete  employee.');
    }

}