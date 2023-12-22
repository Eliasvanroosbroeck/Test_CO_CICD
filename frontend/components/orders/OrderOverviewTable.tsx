import React from "react";
import { Cocktail } from "@/types";
import styles from "../../styles/orders.module.css"

type Props = {
    cocktails: Array<Cocktail> | undefined
}

const OrdersOverviewTable: React.FC<Props> = ({cocktails}: Props) => {
    if(cocktails?.length===0){ return <p style={{position: 'static',display: 'grid',textAlign: 'left',color: 'rgb(0,0,0)'}}> No cocktails available</p>}
    else{
    return(
        <>
            {cocktails && 
                cocktails.map((cocktail, key) => (
                    <div className={styles.tablefirst}>
                        <div className={styles.tablesecond}>
                            <div className={[styles.tablethird,"row"].join(' ')}>
                                <div className={[styles.tablefourth,"col-lg-4"].join(' ')} >
                                    <h1 className={styles.tableh1}>{cocktail.name}</h1>
                                </div>
                                <div className={[styles.tablefifth,"col-lg-7 col-xxl-8 mb-auto"].join(' ')} >
                                    <div className="input-group">
                                        <span className="input-group-text">Amount</span>
                                            <input className={[styles.tablesixth,"form-control"].join(' ')} type="text"  />
                                                 <button className={[styles.tableseventh,"btn btn-primary"].join(' ')}  type="button">Add To Cart</button>
                                    </div>
                                    <p className={styles.tableeighth}>Cocktail price: {cocktail.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>  
            ))}
        </>
    )}
}

export default OrdersOverviewTable