import { PrismaClient } from "@prisma/client";
import {Cocktail} from "../model/Cocktail"
import { mapToCocktails} from "./cocktail.mapper";
import { mapToCocktail } from "./cocktail.mapper";
const database= new PrismaClient();

const getAllCocktails= async (): Promise<Cocktail[]> => {
    try{
        const cocktailPrisma= await database.cocktail.findMany({
           // include: {orders: true,}
        })
        return mapToCocktails(cocktailPrisma);
    } catch(error){
        console.error(error)
        throw new Error ('Database error. see server log for more details');
    }
}

const getCocktailByID= async (id: number): Promise<Cocktail> => {
    try{
        const cocktailPrisma= await database.cocktail.findUnique({where:{cocktailid: id}});
        return mapToCocktail(cocktailPrisma)
    }catch (error){
        console.error(error)
        throw new Error('Database Error. see server logs for more details.')
    }
}

const addCocktail = async ({
    name,
    ingredients,
    description,
    price,
}:{name:string; ingredients:string; description:string, price:number}): Promise<Cocktail> => {
    try{
        const cocktailPrisma = await database.cocktail.create({
            data: {
                name,
                ingredients,
                description,
                price,
            },

        });
        return mapToCocktail(cocktailPrisma)
    } catch (error){
        console.error(error);
        throw new Error ('Database error. see server log for more details')
    }
}

const updateCocktail = async ({
    cocktailid,
    name,
    ingredients,
    description,
    price,
}:{cocktailid:number;
   name:string;
   ingredients:string;
   description:string;
   price:number;
}): Promise<Cocktail> => {
    try{
        const cocktailPrisma = await database.cocktail.update({
            where: {
                cocktailid: cocktailid,
            },
            data: {
                name,
                ingredients,
                description,
                price,
            },

        });
        const cocktail= mapToCocktail(cocktailPrisma)
        console.log("evetns.db.ts working here")
        console.log(cocktail)
        console.log(mapToCocktail(cocktailPrisma))
        return mapToCocktail(cocktailPrisma)
    } catch (error){
        console.error(error);
        throw new Error ('Database error. see server log for more details')
    }
}

const deleteCocktail = async  (id: number): Promise<void>  => {
    try{
        console.log(id)
        await database.cocktail.delete({where: { cocktailid:id, }}); 
    }catch (error){
    throw new Error('Databank Error. See server log for more details')
  }
};



export default {getAllCocktails,getCocktailByID,addCocktail, updateCocktail,deleteCocktail}