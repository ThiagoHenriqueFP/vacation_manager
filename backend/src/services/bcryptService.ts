import { hashSync, compareSync } from 'bcrypt';


export async function hashPasswd(password: string): Promise<string> {
  try {
    const hash = hashSync(password, 10);
    return hash;
  } catch (error){
    console.error(error);
    return error;
  }
}

export async function comparePasswd(password:string, hash: string): Promise<boolean> {
  try {
    return compareSync(password, hash);
  } catch(error) {
    console.error(error);
    return error;
  }
}
