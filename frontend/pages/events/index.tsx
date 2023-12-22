import { Head2 } from "@/components/Head";
import { Header2 } from "@/components/Header";
import { Footer } from "@/components/Footer";
import EventsOverviewTable from "@/components/events/EventsOverviewTable";
import EventsService from "@/services/EventService";
import {useState,useEffect } from "react";
import { Event } from "@/types";
import styles from "../../styles/events.module.css"

const Events: React.FC = () =>{
    const [events, setEvents] = useState<Array<Event>>()
    const [error, setError] = useState('')

    const getEvents = async() => {
        const response = await EventsService.getAllEvents();
        const events = await response.json();
        
        if(!response.ok){
            if(response.status === 401){
                setError("You are not authorized to view this page. Please login first")
            }else {
                setError(response.statusText);
            }
        }else{
            setEvents(events);
        }
    }

    useEffect(() => {
        console.log("index-useeffect")
        getEvents()
    }, [])

    const handleEventListChange = (updatedEvents: Array<Event>) => {
        setEvents(updatedEvents);
    };

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
                                <h1 className={styles.h1style}>Upcoming events</h1>
                                <div className={styles.fourth}>
                                    <div className={styles.fifth}>
                                     <EventsOverviewTable events={events} onEventListChange={handleEventListChange} />
                                    </div>
                                    </div>
                                </div>
                                <a role="button" href="/events/addEvent"><button className={[styles.button,"btn btn-primary link"].join(' ')} type="button">add event</button></a>
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