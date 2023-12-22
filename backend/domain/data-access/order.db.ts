import { Order } from '../model/Order';
import {mapToOrders} from './order.mapper';
import {mapToOrder} from './order.mapper';
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();


const getAllOrders = async (): Promise<Order[]> => {
    try {
        const orderPrisma= await database.order.findMany({
            include: {users:true,}
        })
        console.log(orderPrisma)
        const orders= mapToOrders(orderPrisma)
        console.log(orders)
        return mapToOrders(orderPrisma)
    } catch (error){
        console.error(error)
        throw new Error ('Database error. see server logs for more information');
    }
}

const getOrderByID = async (id: number): Promise<Order> => {
    try {
        const orderPrisma= await database.order.findUnique({
            where: {
                orderid: id,
            },
            include: {
                users:true,
            }
        })
        console.log(orderPrisma)
        const orders= mapToOrder(orderPrisma)
        console.log(orders)
        return mapToOrder(orderPrisma)
    } catch (error){
        console.error(error)
        throw new Error ('Database error. see server logs for more information');
    }
}

const deleteOrder = async  (id: number): Promise<void>  => {
    try{
        await database.order.delete({where: { orderid:id,}}); 
    }catch (error){
    throw new Error('Databank Error. See server log for more details')
  }
};



const addOrder= async ({
    userid,
    deliveryDate,    
}:
{userid:number; 
 deliveryDate:Date; 
}):Promise<Order> =>{
    try{
        const orderPrisma= await database.order.create({
            data:{
                userID:userid,
                deliveryDate:deliveryDate,
            },
        });
        return mapToOrder(orderPrisma)
    }catch(error){
        throw new Error('Databank Error. See server log for more details')  
    }
}

const updateOrder= async ({
    orderid,
    deliveryDate,    
}:
{orderid:number; 
 deliveryDate:Date; 
}):Promise<Order> =>{
    try{
        const orderPrisma= await database.order.update({
            where:{ orderid,},
            data:{
                deliveryDate:deliveryDate,
            },
        });
        return mapToOrder(orderPrisma)
    }catch(error){
        throw new Error('Databank Error. See server log for more details')  
    }
}

export default{getAllOrders,getOrderByID,deleteOrder,addOrder,updateOrder}
