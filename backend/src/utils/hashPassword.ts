import bcrypt from "bcryptjs";

export const hashPassword = async (value: string, salt: number) => {
  return await bcrypt.hash(value, salt);
};

export const comparePassword = async (originalPassword:string,hashPassword:string)=>{
    return await bcrypt.compare(originalPassword,hashPassword).catch(()=> false)
} 