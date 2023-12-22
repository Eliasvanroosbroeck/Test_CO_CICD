
export class Cocktail {
    cocktailid:number
    name:string
    ingredients:string
    description: string
    price: number
    constructor(cocktail: {cocktailid:number, name:string, ingredients:string, description:string, price:number}) {
        this.cocktailid=cocktail.cocktailid;
        this.name=cocktail.name;
        this.ingredients=cocktail.ingredients;
        this.description=cocktail.description;
        this.price=cocktail.price
    }
}
