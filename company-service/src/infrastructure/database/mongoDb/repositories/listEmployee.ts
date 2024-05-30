import { IEmployee } from "../../../../domain/entities";
import Employee from "../model/employeeSchema";


export const listEmployee = async (): Promise<IEmployee[] | null> => {
    try {
        const employeeList = await Employee.find();

        if (employeeList.length === 0) {
            return null;
        }

        return employeeList.reverse();
    } catch (error: any) {
        console.error('Error listing employees:', error.message);
        throw new Error('Failed to list employees.');
    }
};

