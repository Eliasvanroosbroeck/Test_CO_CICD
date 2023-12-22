import {User} from "../../backend/domain/model/User"
export interface Users {
  name: string
  userid?:number
  role?:string
  telNr:string  
  mail: string
  password: string
}

export interface LoginUser {
  name: string
  password: string
}

export interface Event {
  eventid: number
  name:String
  address:String
  date:String
  duration:String
  maxPart:number
  descirption:String
  users:User[]
}

export interface Cocktail {
  cocktailid: number,
  name: string,
  ingredients: string,
  description: string,
  price: number,
}
