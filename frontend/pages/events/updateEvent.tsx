import { Head2 } from "@/components/Head";
import { Header2 } from "@/components/Header";
import { Footer } from "@/components/Footer";
import UpdateEventForm from "@/components/events/EventUpdateForm";
import styles from "../../styles/events.module.css"

const Events: React.FC = () =>{
    return (
        <>
        <Head2></Head2>
        <Header2></Header2>
        <main>
            <section className="masthead">
            <div className={[styles.bg,"intro-body"].join(' ')}>
                <div className={"container"}>
                    <div className={[styles.first,"row"].join(' ')}>
                        <div className={[styles.second,"col-lg-11 order-2 m-auto"].join(' ')}>
                            <div className={styles.third}>
                                <h1 className={styles.h1style}>Update event</h1>
                                <div className={styles.fourth}>
                                    <div className={styles.fifth}>
                                        <div>
                                         <UpdateEventForm></UpdateEventForm>
                                        </div>
                                    </div>
                                    </div>
                                </div>
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