

import { IEmployee } from "../../../../domain/entities"
import Employee from "../model/employeeSchema"

export const editEmployee = async (data: IEmployee): Promise<IEmployee | null | false> => {
    try {
        if (!data?.email) {
            return null
        }
        const employee = await Employee.findOne({ _id: data._id })

        if (!employee) {
            return null
        }

        const existEmployee = await Employee.findOne({
            email: data.email,
            companyId:data.companyId,
            _id: { $ne: data._id } 
        });
        if(existEmployee){
            return null
        }

        const updateEmployee = await Employee.updateOne({ _id: data._id }, data, { new: true })

        if (updateEmployee.modifiedCount > 0) {
            return await Employee.findOne({ email: data.email })

        } else {
            return false
        }



    } catch (error: any) {
        console.error('Error editing employee:', error);
        throw new Error('Failed to edit  employee.');
    }

}