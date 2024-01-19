import {useRouter} from "next/router";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import {getEventById, getAllEvents, getFeaturedEvents} from "@/helpers/api-utils";
import Head from "next/head";
import EventList from "@/components/events/eventlist";
import Comments from "@/components/input/comments";
export default function EventDetailPage(props){
    console.log(props.selectedEvent)
    if(!props.selectedEvent){

        return <div className={'center'}><p> Loading</p></div>
    }
    return (
        <>
            <>
                <Head>
                    <title>
                        {props.selectedEvent.title}
                    </title>
                    <meta name={props.selectedEvent.title} content={props.selectedEvent.description}>

                    </meta>
                </Head>
                <EventList items={props.events}/>
            </>
        <EventSummary title={props.selectedEvent.title}/>
            <EventLogistics date={props.selectedEvent.date} address={props.selectedEvent.location} image={props.selectedEvent.image} imageAlt={props.selectedEvent.title}/>
            <EventContent>
                <p>
                    {props.selectedEvent.description}
                </p>
            </EventContent>
            <Comments eventId={props.selectedEvent.id}/>
        </>
    )
}

export async function getStaticProps(context){
    const eventId=context.params.eventId;
    const event = await getEventById(eventId)
    return {
        props:{selectedEvent:event

        },
        revalidate:30
    }
}
export async function getStaticPaths(){
    const events=await getFeaturedEvents()
    const paths=events.map(event=>({params:{
        eventId:event.id
        }})
    )
    return{
        paths:paths,
        fallback:'blocking'
    }
}