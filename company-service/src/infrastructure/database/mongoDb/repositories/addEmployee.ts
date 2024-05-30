import { IEmployee} from "../../../../domain/entities";
import Employee from "../model/employeeSchema";



export const addEmployee = async (data: IEmployee): Promise<IEmployee | null | boolean> => {
    try {
        if (!data || !data.email) {
            return null;
        }


        const existingEmployee = await Employee.findOne({ companyId: data.companyId, email: data.email });
    

        if (existingEmployee) {
            return false;
        }else{

            const newEmployee = await Employee.create(data);
            return newEmployee;
        }

    } catch (error: any) {
        console.error('Error adding employee:', error);
        throw new Error('Failed to add employee.');
    }
};
