import EventItem from "@/components/events/eventitem";
import styles from './event-list.module.css'
export default function EventList(props) {
    const {items} = props;
    return (
        <ul className={styles.list}>
            {items.map((event, index) => {
                return (
                    <EventItem id={event.id}
                               title={event.title}
                               location={event.location}
                               date={event.date}
                               key={event.id}
                               image={event.image}>
                    </EventItem>
                )
            })}
        </ul>
    )
}