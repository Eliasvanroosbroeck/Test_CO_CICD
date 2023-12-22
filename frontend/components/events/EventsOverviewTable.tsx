import React from "react";
import { Event } from "@/types";
import styles from "../../styles/events.module.css";
import EventsService from "../../services/EventService";
import { useRouter } from 'next/router';

type Props = {
  events: Array<Event> | undefined;
  onEventListChange: (updatedEvents: Array<Event>) => void;
};

const EventsOverviewTable: React.FC<Props> = ({ events, onEventListChange }: Props) => {
    const router = useRouter();

    const handleUpdate = (eventId: number) => {
      sessionStorage.setItem('eventId', eventId.toString());
      router.push(`/events/updateEvent`);
    };
    const handleDelete = async (eventId: number) => {
    try {
      await EventsService.deleteEvent(eventId);
      const updatedEventList = events?.filter((event) => event.eventid !== eventId) || [];
      onEventListChange(updatedEventList);
    } catch (error) {
      // Handle error
    }
  };

  if (events?.length === 0) {
    return <p style={{ position: "static", display: "grid", textAlign: "left", color: "rgb(0,0,0)" }}>No events upcoming</p>;
  } else {
    return (
      <>
        {events &&
          events.map((event, key) => (
            <div className={[styles.tablefirst, "row"].join(" ")} key={event.eventid}>
              <div className={[styles.tablesecond, "col-lg-3"].join(" ")}>
                <h1 className={styles.tableH1}>{event.name}</h1>
                <button className={[styles.tablebutton1, "btn btn-primary"].join(" ")} type="button">
                  Attend
                </button>
                <button className={[styles.tablebutton2, "btn btn-primary"].join(" ")} type="button" onClick={() => handleUpdate(event.eventid)}>
                  Update
                </button>
                <button className={[styles.tablebutton3, "btn btn-primary"].join(" ")} type="button" onClick={() => handleDelete(event.eventid)}>
                  Delete
                </button>
                <p className={styles.tablep1}>attending: {event.users.length}</p>
              </div>
              <div className={[styles.tablethird, "col mb-auto"].join(" ")}>
                <p className={styles.tablep2}>
                  description: {event.descirption}
                  <br />
                  date: {event.date}
                  <br />
                  location: {event.address}
                  <br />
                  maximum users: {event.maxPart}
                </p>
              </div>
            </div>
          ))}
      </>
    );
  }
};

export default EventsOverviewTable;
