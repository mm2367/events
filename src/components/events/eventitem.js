import Link from "next/link";
import styles from './event-item.module.css'
import Button from "@/components/ui/button";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
export default function EventItem(props) {
    const {title, image, date, location, id,key} = props;
    const prettyDate= new Date(date).toLocaleDateString('en-us',{
        day:"numeric",
        month:"long",
        year:"numeric"
    });
    const formattedAddress=location.replace(',','\n')
    const exploreLink=`/events/${id}`
    return (
        <li key={key} className={styles.item}>
            <img src={'/' +image} alt={title}></img>
            <div className={styles.content}>
                <div >
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <span className={styles.icon}><DateIcon className={styles.icon}/></span>
                        <time>
                            {prettyDate}
                        </time>
                    </div>
                    <div className={styles.actions}>
                        <span className={styles.icon}><AddressIcon className={styles.icon}/></span>
                        <address>
                            {formattedAddress}
                        </address>
                    </div>
                </div>
                <div>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={styles.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}