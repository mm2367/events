import EventItem from "@/components/events/eventitem";
import styles from './event-list.module.css'
export default function EventList(props) {
    const {items} = props;
    return (
        <ul className={styles.list}>
            {items?.map((event, index) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <EventItem id={event.id}
                               title={event.title}
                               location={event.location}
                               date={event.date}
                               image={event.image}>
                    </EventItem>
                )
            })}
        </ul>
    )
}