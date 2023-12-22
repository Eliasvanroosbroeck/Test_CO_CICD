import { User } from "../domain/model/User"
import { Cocktail } from "../domain/model/Cocktail"
import { Order } from "../domain/model/Order"
import { type } from "os"


export type UserInput = {
    userid?: number | null
    name: string
    mail: string
    password: string
    role?: string
    telNr: string
  }

export type LoginInput = {
    name: string
    password: string
  }

export type UserSQLUnique = {
    userid?: number | null
    name: string
    mail: string
    password: string
    role?: string
    telNr: string
}
export type UserLogin = {
  name:string
  password:string
}

export type EventInput = {
  eventid?:number | null
  name:string
  address:string
  date:string
  duration:string
  description:string
  users: User[]
  maxUsers?:number
}

export type EventPrisma = {
  eventid?:number | null
  name:string
  address:string
  date:string
  duration:string
  description?:string
  users?: User[]
  maxUsers?:number
}

//needed for swagger test AddUserToEvent
export type AddUserToEvent = {
  eventid: number;
  userid: number;
}

export type CocktailSQLView = {
  cocktailid?:number | null
  name:string
  ingredients:string;
  description:string;
  price: number
  orders?: Order[];
}

export type OrderSQLView = {
  orderid?:number
  userId?:number
  deliveryDate: Date
  user?: User
}


export type OrderCocktailMap = {
    cocktailid?:number
    cocktail?: Cocktail
    orderid?: number
    order?: Order
    createdAt?: Date
    amount?: Int16Array
  }

  export type PrismaCocktailOrderMap = {
    cocktailid: number;
    orderid: number;
    createdAt: Date;
    amount: number;
    order: Order;
    cocktail:Cocktail;
}

export type PrismaCocktailOrderAdd = {
  cocktailid: number;
  orderid: number;
  amount: number;
}

