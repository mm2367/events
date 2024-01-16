import EventList from "@/components/events/eventlist";
import EventSearch from "@/components/events/events-search";
import {useRouter} from "next/router";
import {getAllEvents} from "@/helpers/api-utils";

export default function AllEventsPage(props) {
    const router=useRouter();
    const findEventsHandler=(year, month)=>{
        const fullPath=`/events/${year}/${month}/`
        router.push(fullPath)
    }
    return (
        <>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList items={props.events}/>
        </>
    )
}
export async function getStaticProps(){
    const allEvents=await getAllEvents();
    return{
        props:{
            events:allEvents
        },
        revalidate:60
    }
}