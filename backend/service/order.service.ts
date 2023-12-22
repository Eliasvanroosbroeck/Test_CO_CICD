import { Order } from "../domain/model/Order";
import orderDB from "../domain/data-access/order.db";
import { OrderSQLView } from "../types/types";

const getAllOrders = async (): Promise<Order[]> => orderDB.getAllOrders();


const getOrderByID = async (id:number): Promise<Order> => {
    if(Number.isNaN(Number(id))){ throw new Error('Id is an invalid number'); }
    const order = await orderDB.getOrderByID(id);
    console.log(order)
    if (!order){ throw new Error (`No sush order exists with ID ${id}`);}
    return order
};

const addOrder = async ({userId, deliveryDate}: OrderSQLView): Promise<Order> => {
    if(!userId){throw new Error('userId is empty')}
    if(!deliveryDate){throw new Error('invalid DeliveryDate')}
    return await orderDB.addOrder({userid:userId, deliveryDate});
};


export default{getAllOrders, getOrderByID, addOrder}