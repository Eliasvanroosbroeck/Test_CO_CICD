import { CocktailOrder } from "../domain/model/CocktailOrder";
import cocktailOrder from "../domain/data-access/cocktailorder.db";
import { OrderSQLView, PrismaCocktailOrderAdd } from "../types/types";

const getAllCocktailOrders = async (): Promise<CocktailOrder[]> => cocktailOrder.getAllCocktailOrders();


const getCocktailOrdersByOrderID = async (id:number): Promise<CocktailOrder[]> => {
    if(Number.isNaN(Number(id))){ throw new Error('Id is an invalid number'); }
    const order = await cocktailOrder.getCocktailOrdersByOrderID(id);
    console.log(order)
    if (!order){ throw new Error (`No sush order exists with ID ${id}`);}
    return order
};

const addCocktailOrder = async (cocktailorder: PrismaCocktailOrderAdd): Promise<void> => {
    if(!cocktailorder.orderid){throw new Error('orderid is empty');}
    if(!cocktailorder.cocktailid){throw new Error('cocktailid is empty');}
    const order= await cocktailOrder.addCocktailOrder(cocktailorder)
};

const deleteCocktailOrder = async (cocktailid:number, orderid: number): Promise<void> => {
    if(!cocktailid){ throw new Error('cocktailId is empty')};
    if(!orderid){ throw new Error('orderid is empty')};
    cocktailOrder.deleteCocktailOrder(cocktailid, orderid);
}

const updateAmountOnCocktailOrder = async(cocktailorder: CocktailOrder): Promise<void> =>{
    if(!cocktailorder.amount){throw new Error ('amount is empty')};
    cocktailOrder.updateAmountOnCocktailOrder(cocktailorder);
}

export default {getAllCocktailOrders, getCocktailOrdersByOrderID, addCocktailOrder, deleteCocktailOrder,updateAmountOnCocktailOrder}
