import { Cocktail } from "../model/Cocktail"
import {CocktailSQLView} from "../../types/types"


export const mapToCocktails = (CocktailSQLView: CocktailSQLView[]): Cocktail[] => CocktailSQLView.map(mapToCocktail);

export const mapToCocktail = ({cocktailid, name, ingredients, description,price}: CocktailSQLView): Cocktail =>
    new Cocktail({cocktailid, name, ingredients, description,price});

export default {mapToCocktail,mapToCocktails}