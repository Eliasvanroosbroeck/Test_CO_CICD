import React from "react";
import { Cocktail } from "@/types";
import styles from "../../styles/cocktail.module.css"
import CocktailService from "@/services/CocktailService";
import { useRouter } from 'next/router';

type Props = {
    cocktails: Array<Cocktail> | undefined
    onEventListChange: (updatedCocktails: Array<Cocktail>) => void;
}

const CocktailOverviewTable: React.FC<Props> = ({cocktails, onEventListChange}: Props) => {
    const router = useRouter();
    const handleDelete = async (cocktailId: number) => {
        try {
          await CocktailService.deleteCocktail(cocktailId);
          const updatedCocktails = cocktails?.filter((cocktail) => cocktail.cocktailid !== cocktailId) || [];
          onEventListChange(updatedCocktails);
        } catch (error) {
          // Handle error
        }
      };

    const handleUpdate = (cocktailId: number) => {
        sessionStorage.setItem('cocktailId', cocktailId.toString());
        router.push(`/cocktails/updateCocktail`);
    };

    if(cocktails?.length===0){ return <p style={{position: 'static',display: 'grid',textAlign: 'left',color: 'rgb(0,0,0)'}}> No Cocktails Available</p>}
    else{
    return(
        <>
            {cocktails && 
                cocktails.map((cocktail, key) => (
                <div className={[styles.tablefirst,"row"].join(' ')} key={cocktail.cocktailid}>
                    <div className={[styles.tablesecond,"col-lg-3"].join(' ')}>
                        <h1 className={styles.tableH1} >{cocktail.name}</h1>
                        <button className={[styles.tablebutton1,"btn btn-primary"].join(' ')} type="button" onClick={() => handleUpdate(cocktail.cocktailid)} >Update</button>
                        <button className={[styles.tablebutton2,"btn btn-primary"].join(' ')} type="button" onClick={() => handleDelete(cocktail.cocktailid)}>Delete</button>
                        <p className={styles.tablep1}>Cocktail price: {cocktail.price}</p>
                    </div>
                    <div className={[styles.tablethird,"col mb-auto"].join(' ')}>
                        <p className={styles.tablep2}>
                           description: {cocktail.description}
                           <br />
                           ingredients: {cocktail.ingredients}
                           </p>
                    </div>
                </div>
            ))}
                

        </>
    )}
}

export default CocktailOverviewTable