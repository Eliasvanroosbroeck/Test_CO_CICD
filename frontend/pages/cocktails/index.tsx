import { Head2 } from "@/components/Head";
import { Header2 } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CocktailService from "@/services/CocktailService";
import {useState,useEffect } from "react";
import { Cocktail } from "@/types";
import CocktailOverviewTable from "@/components/cocktail/CocktailOverviewTable";
import styles  from "../../styles/cocktail.module.css"


const Events: React.FC = () =>{
    const [cocktails, setCocktails] = useState<Array<Cocktail>>()

    const getCocktails = async() => {
        CocktailService.getAllCocktails()
        .then((res) => res.json())
        .then((cocktails) => setCocktails(cocktails))
        console.log(cocktails)
    }

    useEffect(() => {
        console.log("index-useeffect")
        getCocktails()
    }, [])

    const handleEventListChange = (updatedCocktails: Array<Cocktail>) => {
        setCocktails(updatedCocktails);
    };

    return (
        <>
        <Head2></Head2>
        <Header2></Header2>
        <main>
            <section className="masthead">
            <div className={[styles.bg,"intro-body"].join(' ')} >
                <div className={"container"}>
                    <div className={[styles.first,"row"].join(' ')}>
                        <div className={[styles.second,"col-lg-11 order-2 m-auto"].join(' ')}>
                            <div className={styles.third}>
                                <h1 className={styles.h1style}>Cocktails</h1>
                                <div className={styles.fourth}>
                                    <div className={styles.fifth}> 
                                        <CocktailOverviewTable cocktails={cocktails} onEventListChange={handleEventListChange} />
                                    </div>
                                    </div>
                                </div>
                                <a role="button" href="/cocktails/addCocktail"><button className={[styles.button,"btn btn-primary link"].join(' ')} type="button">add cocktail</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Events