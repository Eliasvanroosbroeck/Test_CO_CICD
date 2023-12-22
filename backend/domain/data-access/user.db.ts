import { error } from 'console';
import { User } from '../model/User';
import {mapToUsers} from './user.mapper';
import {mapToUser} from './user.mapper';
import { PrismaClient } from "@prisma/client";
const database = new PrismaClient();


const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        const userlist = mapToUsers(userPrisma)
        //console.log(userlist) Dit werkt
        return userlist
    }catch (error){
        console.error(error)
        throw new Error('Database error. see server log for more details');
    }
};

const getUserByID = async (id: number): Promise<User> => {
    try{
        const userPrisma = await database.user.findUnique({where:{userid: id}});
        console.log(userPrisma) 
        return mapToUser(userPrisma)
    } catch (error){
        console.error(error)
        throw new Error('Database Error. see server log for more details')
    }
}

const getUserByName = async (name: string): Promise<User> => {
    try{
        const userPrisma = await database.user.findFirst({where:{name: name}});
        console.log(userPrisma) 
        return mapToUser(userPrisma)
    } catch (error){
        console.error(error)
        throw new Error('Database Error. see server log for more details')
    }
}

const getUserExists =async (username:string) => {
    try{
        const userPrisma = await database.user.findFirst({where:{name: username}});
        console.log(userPrisma)
        return Boolean(userPrisma); 
    } catch (error){
        console.error(error)
        throw new Error('Database Error. see server log for more details')
    }
}

const addUser = async ({
        name, 
        telNr, 
        mail,
        password,
    }:{name: string;
        telNr:string;
        mail:string;
        password: string;
    }): Promise<User> =>{
            try{
                const userPrisma= await database.user.create({
                    data :{
                        name,
                        mail,
                        password,
                        telNr,
                    },
                });
                return mapToUser(userPrisma)
            }catch(error){
                console.error(error);
                throw new Error('Database error. see server log for details.');
            }
    }

const deleteUser = async  (id: number): Promise<void>  => {
    try{
        await database.user.delete({where: { userid:id, }});
    }catch (error){
    throw new Error('Databank Error. See server log for more details')
  }
};

const updateUser = async ({
    id,
    name, 
    telNr, 
    mail,
    password,
    role,
}:{
    id:number;
    name: string;
    telNr:string;
    mail:string;
    password: string;
    role: string;
}): Promise<User> =>{
        try{
            const userPrisma= await database.user.update({
                where: {
                    userid: id
                },
                data :{
                    name,
                    mail,
                    password,
                    telNr,
                    role,
                },
            });
            const user = mapToUser(userPrisma)
            console.log(user)
            return mapToUser(userPrisma)
        }catch(error){
            console.error(error);
            throw new Error('Database error. see server log for details.');
        }
}


export default {getAllUsers, getUserByID, addUser, deleteUser, updateUser, getUserExists, getUserByName}
