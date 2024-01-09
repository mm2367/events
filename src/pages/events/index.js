import {getAllEvents} from "../../../dummy-data";
import EventList from "@/components/events/eventlist";
import EventSearch from "@/components/events/events-search";
import {useRouter} from "next/router";

export default function AllEventsPage() {
    const router=useRouter();
    const allEvents = getAllEvents()
    const findEventsHandler=(year, month)=>{
        const fullPath=`/events/${year}/${month}/`
        router.push(fullPath)
    }
    return (
        <>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList items={allEvents}/>
        </>
    )
}