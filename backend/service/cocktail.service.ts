import { Cocktail } from "../domain/model/Cocktail";
import cocktailsDb from "../domain/data-access/cocktails.db";
import { CocktailSQLView } from "../types/types";


const getAllCocktails = async (): Promise<Cocktail[]> => cocktailsDb.getAllCocktails();
const getCocktailByID = async (id: number): Promise<Cocktail> => {
    if(Number.isNaN(Number(id))){throw new Error('ID is empty or invalid');}
    const cocktail = await cocktailsDb.getCocktailByID(id);
    if (!cocktail){throw new Error ('No cocktail with this ID found');}
    return cocktail
};

const addCocktail = async ({name, ingredients, description, price}: CocktailSQLView): Promise<Cocktail> =>{
    if(!name || name ==""){throw new Error('Name is empty')}
    if(!ingredients){throw new Error('Ingredients are empty');}
    if(!description){throw new Error('description are empty');}
    if(Number.isNaN(Number(price))){throw new Error('price is NAN');}
    return await cocktailsDb.addCocktail({name, ingredients, description,price});
}

const deleteCocktail = async (id: number): Promise<void> => {
    if(Number.isNaN(Number(id))){throw new Error('Id is empty')}
    await cocktailsDb.deleteCocktail(id)
    console.log(id)
}

const updateCocktail = async ({cocktailid, name,  ingredients,   description, price}: CocktailSQLView): Promise<Cocktail> => {
    //if(!userid){throw new Error ("ID is invalid or does not exist")}
    if(!name || name ==""){throw new Error('Name is empty')}
    if(!cocktailid){throw new Error('ID is empty or Invalid')}
    if(!ingredients){throw new Error('ingredients are empty or invalid')}
    if(!description){throw new Error('description is empty')}
    const cocktail= await cocktailsDb.updateCocktail({cocktailid, name, ingredients, description, price});
    console.log(cocktail)
    return cocktail
};

export default {getAllCocktails, getCocktailByID, addCocktail,updateCocktail,deleteCocktail}


