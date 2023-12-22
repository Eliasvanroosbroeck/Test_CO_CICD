import { Order } from "@prisma/client"
import { Cocktail } from "./Cocktail"

export class CocktailOrder{
    cocktailid?:number
    cocktail: Cocktail
    orderid?: number
    order: Order
    createdAt: Date
    amount: number
  constructor(cocktailorder: {cocktailid?:number, cocktail?:Cocktail, orderid?:number, order?:Order, createdAt:Date, amount: number}) {
        this.cocktailid=cocktailorder.cocktailid
        this.cocktail=cocktailorder.cocktail
        this.orderid=cocktailorder.orderid
        this.order=cocktailorder.order
        this.createdAt=cocktailorder.createdAt
        this.amount=cocktailorder.amount
}

static from(arg0: CocktailOrder): any {
    return new CocktailOrder({amount:arg0.amount, cocktail: arg0.cocktail, order:arg0.order,cocktailid:arg0.cocktailid, createdAt:arg0.createdAt, orderid:arg0.orderid})
}

}
  