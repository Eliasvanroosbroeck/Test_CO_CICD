import { Head2 } from "@/components/Head";
import { Header2 } from "@/components/Header";
import { Footer } from "@/components/Footer";
import OrderOverviewTable from "@/components/orders/OrderOverviewTable";
import OrdersService from "@/services/OrderService";
import {useState,useEffect } from "react";
import { Cocktail } from "@/types";
import styles from "../../styles/orders.module.css"

const Cocktails: React.FC = () =>{
    const [cocktails, setEvents] = useState<Array<Cocktail>>()

    const getCocktails = async() => {
        console.log("index-getEvents")
        OrdersService.getAllCocktails()
        .then((res) => res.json())
        .then((cocktails) => setEvents(cocktails))
        console.log(cocktails)
    }

    useEffect(() => {
        console.log("index-useeffect")
        getCocktails()
    }, [])

    return (
        <>
        <Head2></Head2>
        <Header2></Header2>
        <section className="masthead">
            <div className={[styles.first,"intro-body"].join(' ')} >
                <div className={[styles.second,"container py-4 py-xl-5"].join(' ')} >
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <h2 className={styles.sec1h2}>Order</h2>
                        </div>
                    </div>
                    <div className={[styles.third,"row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3"].join(' ')}>
                        <div className={[styles.fourth,"col-xxl-7"].join(' ')} >
                            <div>
                                <div className="py-4">
                                    <h4>Cocktails</h4>
                                        <OrderOverviewTable cocktails={cocktails} />
                                </div>
                            </div>
                        </div>
    {/*start cart section */ }
                        <div className={[styles.fifth,"col-xxl-4"].join(' ')}>
                            <div>
                                <div className={[styles.sixth,"py-4"].join(' ')} >
                                    <div className={[styles.fifth,"py-4"].join(' ')}>
                                        <h4 className={styles.sec2h4}>Cart</h4>
                                        <p className={styles.sec2h4}>Cart is empty</p>
    {/*loop this for every session stored cocktail*/}
                                        <div className={styles.seventh}>
                                            <div className={styles.eighth}>
                                                <div className={[styles.ninth,"row"].join(' ')} >
                                                    <div className={[styles.tenth,"col-lg-7 col-xxl-11 mb-auto"].join(' ')} >
                                                        <p className={styles.sec2p1}>Cocktail:</p>
                                                        <p className={styles.sec2p2}>amount:</p>
                                                    </div>
                                                    <div className="col">
                                                        <button className={[styles.eleventh,"btn btn-primary"].join(' ')} type="button">Delete from Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                    
        </section>
        <Footer></Footer>
        </>
    )
}

export default Cocktails