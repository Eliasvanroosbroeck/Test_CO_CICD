import { EventModel } from '../model/EventModel';
import { User } from '../model/User';
import {mapToEvents} from './event.mapper';
import {mapToEvent} from './event.mapper';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllEvents = async (): Promise<EventModel[]> => {
    try {
        const eventPrisma = await prisma.events.findMany({
            include: {users:true,}
        });

        console.log(eventPrisma)
        return mapToEvents(eventPrisma)
    } catch (error){
        console.error(error)
        throw new Error('Database error. See server logs for more details.')
    
    }
};

const getEventByID = async (id: number): Promise<EventModel> => {
    try{
        const eventPrisma= await prisma.events.findUnique({where:{eventid: id}, include:{users: true,}});
        const list = mapToEvent(eventPrisma)
        console.log(list)
        return mapToEvent(eventPrisma)
    } catch(error){
        console.error(error)
        throw new Error ('Database error. see server log for more information');
    }
};

const addEvent = async ({
     name,
     address,
     date,
     duration,
     description,
     maxUsers,
}:{
    name: string;
    address: string;
    date: string;
    duration: string;
    description:string
    maxUsers: number;

}): Promise<EventModel> => {
    try {
        const eventPrisma= await prisma.events.create({
            data:{
                name,
                address,
                date,
                duration,
                description: description,
                maxUsers,
             }
        })
        return mapToEvent(eventPrisma)
    }catch (error){
        console.error(error)
        throw new Error('Database error. see server log for more details')
    }
};

const getParticipantsFromEventByID = async (id: number): Promise<User[]> =>{
    
    try{
        const users=[] 
        const event= await getEventByID(id);
        console.log(event.users)
        users.push(event.users)
        return users
    }catch(error){console.error(error)
    throw new Error ('Database error. See server details for more information');}
};

const deleteEvent = async  (id: number): Promise<void>  => {
    try{
        await prisma.events.delete({where: { eventid:id, }}); 
    }catch (error){
    throw new Error('Databank Error. See server log for more details')
  }
};

const UpdateEvent = async ({
    id,
    name,
    address,
    date,
    duration,
    description,
    maxPart,
}:{
    id:number;
    name: string;
    address: string;
    date: string;
    duration: string;
    description:string
    maxPart: number;
}): Promise<EventModel> =>{
        try{
            const userPrisma= await prisma.events.update({
                where: {
                    eventid: id
                },
                data :{
                    name,
                    address,
                    date,
                    duration,
                    description,
                    maxUsers:maxPart,
                },
            });
            const event = mapToEvent(userPrisma)
            console.log(event)
            return mapToEvent(userPrisma)
        }catch(error){
            console.error(error);
            throw new Error('Database error. see server log for details.');
        }
}

const addUserToEvent = async ({
    eventid,
    userid,
}:{
    eventid:number;
    userid:number;

}): Promise<EventModel> =>{
        try{
            const eventPrisma= await prisma.events.update({
                where: {
                    eventid: eventid
                },
                data :{
                    users:{connect: [{userid: userid }]},
                },
                include: {
                    users:true,
                },
            });
            const event = mapToEvent(eventPrisma)
            console.log(event)
            return mapToEvent(eventPrisma)
        }catch(error){
            console.error(error);
            throw new Error('Database error. see server log for details.');
        }
}
export default {getParticipantsFromEventByID, getEventByID,getAllEvents,addEvent,deleteEvent, UpdateEvent, addUserToEvent}
