import { EventModel } from "../domain/model/EventModel";
import eventDB from "../domain/data-access/events.db";
import { EventInput } from "../types/types";
import { User } from "../domain/model/User"

const getAllEvents = async (): Promise<EventModel[]> => eventDB.getAllEvents();

const getEventByID = async (id:number): Promise<EventModel> => {
    if(Number.isNaN(Number(id))){ throw new Error('Id is an invalid number'); }
    const event = await eventDB.getEventByID(id);
    if (!event){ throw new Error (`No sush event exists with ID ${id}`);}
    return event
};

const addEvent = async ({name,   address, date, duration, description,maxUsers} : EventInput): Promise<EventModel> => {
    if(!name || name == ""){throw new Error ('Name is empty')}
    if(!address){throw new Error('Address is empty')}
    if(!date){throw new Error ('Date is empty')}
    if(!description){throw new Error ('Description is empty')}
    return await eventDB.addEvent({name,address,date,duration,description,maxUsers});
};

const getParticipantsFromEventByID = async (id: number): Promise <User[]> =>{
    if(Number.isNaN(Number(id))){throw new Error('id is empty')}
    const list= await eventDB.getParticipantsFromEventByID(id);
    console.log(list)
    return list
}

const deleteEvent = async (id: number): Promise <void> =>{
    if(Number.isNaN(Number(id))) {throw new Error('Id is empty')}
    await eventDB.deleteEvent(id);
}

const UpdateEvent = async ({eventid,name,address,date,duration,description,maxUsers}: EventInput):Promise<EventModel> => {
    if(Number.isNaN(Number(eventid))){throw new Error ('No valid ID')}
    if(!name || name == ""){throw new Error ('Name is empty')}
    if(!address){throw new Error('Address is empty')}
    if(!date){throw new Error ('Date is empty')}
    if(!description){throw new Error ('Description is empty')}
    return await eventDB.UpdateEvent({id:eventid,name,address,date,duration,description,maxPart: maxUsers});
}

const addUserToEvent = async (userid: number, eventid:number): Promise <EventModel> => {
    if(Number.isNaN(Number(userid))){throw new Error('id is empty')}
    if(Number.isNaN(Number(eventid))){throw new Error('id is empty')}
    return await eventDB.addUserToEvent({eventid, userid});
}

export default {getAllEvents, getEventByID,addEvent,getParticipantsFromEventByID, deleteEvent, UpdateEvent, addUserToEvent}


