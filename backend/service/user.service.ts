import { User } from "../domain/model/User";
import userDB from "../domain/data-access/user.db";
import { UserInput, UserSQLUnique } from "../types/types";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";



const getAllUsers = async (): Promise<User[]> =>userDB.getAllUsers();

const getUserByID = async (id:number): Promise<User> => {
    if(Number.isNaN(Number(id))){ throw new Error('Id is an invalid number'); }
    const user = await userDB.getUserByID(id);
    if (!user){ throw new Error (`No such user exists with ID ${id}`);}
    return user
};

const getUserByName =async (name:string) => {
    if (!name && name.trim()===''){
        throw new Error('Give a valid name')
    }
    const user = await userDB.getUserByName(name);
    if(!user){throw new Error(`No user with name: ${name} exists`)}
    return user
}

const authenticate = async(username: string, password:string): Promise<string> => {
    const user = await getUserByName(username);
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword)
    if (!isValidPassword){ throw new Error('Incorrect password.')}
    return generateJwtToken(username)
}

const generateJwtToken = (username: string): string => {
    const jwtSecret= process.env.JWT_SECRET;
    const options= {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer:'cocktailbar'};
    try {
        return jwt.sign({username}, jwtSecret, options);
    }catch (error){
        console.log(error)
        throw new Error ('Error generating JWT token, see server log for details')
    }
}

const addUser = async ({name,  telNr,   mail, password,}: UserSQLUnique): Promise<User> => {
    if(!name || name ==""){throw new Error('Name is empty')}
    if(!telNr){throw new Error('Telnr is empty or Invalid')}
    if(!mail || mail ==""){throw new Error('mail is empty or invalid')}
    if(!password || password ==""){throw new Error('password is empty')}
    const existingUser = await userDB.getUserExists(name);
    if(existingUser){throw new Error(`User with username ${name} already exists`)}
    const hashedPW = await bcrypt.hash(password,12)
    const user= await userDB.addUser({name, telNr,mail,password:hashedPW});
    console.log(user)
    return user
};

const deleteUser = async (id: number): Promise<void> => {
    if(Number.isNaN(Number(id))){throw new Error('Id is empty')}
    await userDB.deleteUser(id)
}

const updateUser = async ({userid, name,  telNr,   mail, password, role}: UserInput): Promise<User> => {
    if(!userid){throw new Error ("ID is invalid or does not exist")}
    if(!name || name ==""){throw new Error('Name is empty')}
    if(!telNr){throw new Error('Telnr is empty or Invalid')}
    if(!mail || mail ==""){throw new Error('mail is empty or invalid')}
    if(!password || password ==""){throw new Error('password is empty')}
    const user= await userDB.updateUser({id: userid, name, telNr,mail,password, role});
    console.log(user)
    return user
};



export default{getAllUsers, getUserByID, addUser, deleteUser, updateUser, getUserByName, authenticate}

