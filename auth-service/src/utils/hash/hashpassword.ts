import { hash, genSalt } from "bcryptjs";

export const hashPassword = async (password: string): Promise<string | Error> => {
    try {
        const hashedPassword = await hash(password, await genSalt(10));
        return hashedPassword ? hashedPassword : new Error("Error occurred in hashing the password");
    } catch (error: any) {
        throw new Error(error);
    }
};
