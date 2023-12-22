
import { PrismaCocktailOrderAdd, PrismaCocktailOrderMap } from "../../types/types";
import { CocktailOrder } from "../model/CocktailOrder";
import { PrismaClient } from "@prisma/client";
const database= new PrismaClient();

const getAllCocktailOrders= async (): Promise<CocktailOrder[]> => {
    try{
        const orders: PrismaCocktailOrderMap[] = await database.cocktailOrder.findMany({
            include:{
                order:true,
                cocktail: true,
            }
        });
        return orders.map(orders => CocktailOrder.from(<CocktailOrder>orders));
    } catch(error){
        console.error(error)
        throw new Error ('Database error. see server log for more details');
    }
}

const getCocktailOrdersByOrderID= async (id: number): Promise<CocktailOrder[]> => {
    try{
        const orders: PrismaCocktailOrderMap[] = await database.cocktailOrder.findMany({
            where:{orderid: id},
            include:{
                order:true,
                cocktail: true,
            }
        });
        return orders.map(orders => CocktailOrder.from(<CocktailOrder>orders));
    } catch(error){
        console.error(error)
        throw new Error ('Database error. see server log for more details');
    }
}

const addCocktailOrder= async (cocktailOrder: PrismaCocktailOrderAdd): Promise<void> => {
    await database.cocktailOrder.create({
        data: {
            cocktail:{connect: {cocktailid: cocktailOrder.cocktailid }},
            order: { connect: { orderid: cocktailOrder.orderid } },
            amount: cocktailOrder.amount,
        },
    });
}

const updateAmountOnCocktailOrder= async(cocktailOrder: CocktailOrder): Promise<void> => {
    await database.cocktailOrder.update({
        where: {cocktailid_orderid:{
                cocktailid:cocktailOrder.cocktailid,
                orderid:cocktailOrder.orderid,
                }},
        data: {
            amount: cocktailOrder.amount, 
        },
    });
}

const deleteCocktailOrder = async  (cocktailid: number, orderid: number): Promise<void>  => {
    try{
        await database.cocktailOrder.delete({
            where: { 
              cocktailid_orderid:{
                cocktailid:cocktailid,
                orderid:orderid,
              }
            }},); 
    }catch (error){
    throw new Error('Databank Error. See server log for more details')
  }
};


export default{getAllCocktailOrders, getCocktailOrdersByOrderID, addCocktailOrder,deleteCocktailOrder,updateAmountOnCocktailOrder}