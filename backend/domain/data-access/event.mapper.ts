import {UserInput, EventPrisma} from "../../types/types"
import { mapToUsers } from "./user.mapper";
import { EventModel } from "../model/EventModel";
import { User } from "../model/User";


export const mapToEvents = (EventInput: (EventPrisma & {users?: UserInput[]} )[]): EventModel[] => EventInput.map(mapToEvent);

export const mapToEvent = ({eventid, name, address, date, duration,description, users, maxUsers,}: EventPrisma & {users?: UserInput[]}): EventModel =>
    new EventModel({eventid, name, address, date, duration,description, users: mapToUsers(users), maxPart: maxUsers});

export default {mapToEvents, mapToEvent}