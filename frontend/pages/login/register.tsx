import { Head2 } from "@/components/Head";
import { Header2 } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "../../styles/login.module.css"
import RegistrationForm from "@/components/login/RegisterUserForm";

const Events: React.FC = () =>{
    return (
        <>
        <Head2></Head2>
        <Header2></Header2>
        <section className="masthead">
        <div className={[styles.first,"intro-body"].join(' ')}>
            <div className={[styles.second,"container"].join(' ')}>
                <div className={[styles.third,"row"].join(' ')}>
                    <div className={[styles.fourth,"col-lg-11 order-2 m-auto"].join(' ')} >
                        <div className={styles.fifth}>
                            <h1 className={styles.sec1h1}>Register</h1>
                            <div className={styles.sixth}>
                                <div className={styles.seventh}>
                                    <div className={[styles.eigthth,"row"].join(' ')} >
                                        <div className="col">
                                            <RegistrationForm></RegistrationForm>
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

export default Events