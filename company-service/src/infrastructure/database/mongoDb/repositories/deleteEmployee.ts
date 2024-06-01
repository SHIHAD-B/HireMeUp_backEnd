import Employee from "../model/employeeSchema"

export const deleteEmployee = async (id: string): Promise<boolean | null> => {
    try {
   
        if (!id) {
            return null
        }

        const employee = await Employee.findOne({ _id: id })
        if (!employee) {
            return null
        }

        const blockedEmployee = await Employee.updateOne({ _id: id }, {
            isActive: false,
            deleted: true
        }, { new: true })

        return blockedEmployee.modifiedCount > 0 ? true : false;


    } catch (error: any) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete  employee.');
    }

}