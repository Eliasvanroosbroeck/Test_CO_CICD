import { Inter } from 'next/font/google'
import {Header2} from "@/components/Header"
import { Footer } from '@/components/Footer'
import { Head2 } from '@/components/Head'
import styles from "../styles/home.module.css"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head2></Head2>
      <Header2></Header2>
        <main>
            <section className="masthead">
                <div className={[styles.first,"intro-body"].join(' ')} >
                  <div className="container">
                    <div className={[styles.second,"row"].join(' ')}>
                        <div className={[styles.third,"col-lg-8 mx-auto"].join(' ')}>
                            <h1 className={[styles.fourth,"brand-heading"].join(' ')}>Le Cocktailbar</h1>
                            <div className={styles.fifth}>
                                <p className={[styles.sixth,"intro-text"].join(' ')}>A juicy, fresh, alcoholic or non alcoholic cocktail.<br />Created with love.</p>
                             </div><a className={[styles.seventh,"btn btn-link btn-circle"].join(' ')} role="button" href="#about">&dArr;</a>
                         </div>
                     </div>
                  </div>
                </div>
             </section>

             <section className="text-center content-section" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2>About Le cocktailbar</h2>
                            <p>Welcome to our cocktail bar, where every sip takes you on a journey of flavor and delight. Our mixologists are artists, carefully crafting each drink to perfection, using only the finest ingredients and spirits. Step inside and let the ambience transport you to a world of glamour and sophistication.</p>
                            <p>When you walk into our shop to start your day, we are dedicated to providing you with friendly service, a welcoming atmosphere, and above all else, excellent products made with the highest quality ingredients. If you are not satisfied, please let us know and we will do whatever we can to make things right!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={[styles.eighth,"text-center download-section content-section"].join(' ')} id="download">
                <div className={[styles.ninth,"container"].join(' ')}>
                    <div className={[styles.tenth,"col-lg-8 mx-auto"].join(' ')} >
                        <h1 className={styles.eleventh}>We also Deliver at home!</h1>
                        <p className={styles.eleventh}>Get your cocktails fast</p>
                          <a className={[styles.twelfth,"btn btn-outline-link btn-lg btn-default"].join(' ')} role="button" href="/orders">visit Order page</a>
                    </div>
                </div>
            </section>
            <div className="map-clean"></div>
        </main>
      <Footer></Footer>
    </>
  )
}
