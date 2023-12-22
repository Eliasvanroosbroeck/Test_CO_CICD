import { User } from "../model/User"

export class Order{
    readonly orderid:number;
    readonly userID: number;
    readonly deliveryDate: Date;
    readonly user?: User;
    constructor(order:{orderid:number, userID?:number, deliveryDate:Date, user?: User}){
        this.orderid=order.orderid;
        this.userID=order.userID;
        this.deliveryDate=order.deliveryDate;
        this.user=order.user;
    }  
}