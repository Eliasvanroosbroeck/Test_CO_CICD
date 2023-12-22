import { User } from "./User"

export class EventModel{
    readonly eventid?:number;
    readonly name:string;
    readonly address:string;
    readonly date:string;
    readonly duration:string;
    readonly descirption: string;
    readonly users:User[];
    readonly maxPart?:number;

    constructor(events:{eventid?:number, name:string, address:string, date:string, duration:string,  description:string, users:User[], maxPart?:number}){
        this.eventid=events.eventid;
        this.name=events.name;
        this.address=events.address;
        this.date=events.date;
        this.duration=events.duration;
        this.descirption=events.description
        this.users=events.users;
        this.maxPart=events.maxPart;
    }
}