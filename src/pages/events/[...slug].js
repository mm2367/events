import useSwr from 'swr';
import {useRouter} from "next/router";
import useSWR from "swr";
import EventList from "@/components/events/eventlist";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert/error-alert";
import {useEffect, useState} from "react";
import Head from "next/head";
export default function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents]=useState([]);
    const router = useRouter();
    const filteredData = router.query.slug;
    const fetcher = url => fetch(url).then(res => res.json())

    const {data,error} = useSWR('https://events-project-nextjs-ee747-default-rtdb.firebaseio.com/events.json',fetcher);
    useEffect(() => {
        if(data){
            const events=[];
            for(const key in data){
                events.push({id:key, ...data[key]})
            }
            setLoadedEvents(events)
        }
    }, [data]);
    if (!loadedEvents || !filteredData) {
        return (
            <p className={'loaded'}>
                Loading....
            </p>
        )
    }
    const filteredYear = filteredData[0]
    const filteredMonth = filteredData[1]
    const numberYear = +filteredYear
    const numberMonth = +filteredMonth
    if (isNaN(numberYear) || isNaN(numberMonth) || numberYear > 2030 || numberYear < 2021 || numberMonth < 1 || numberMonth > 12) {
        return(
            <>
                <ErrorAlert>
                    <p>
                        Invalid Filter. Please adjust your values
                    </p>
                </ErrorAlert>
                <Button link={'/events'}>
                    Go back to all events
                </Button>
            </>
        )
    }
    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numberYear && eventDate.getMonth() === (numberMonth - 1);
    });

    if(error){
        return(
            <>
                <ErrorAlert>
                    <p>
                        Invalid Filter. Please adjust your values
                    </p>
                </ErrorAlert>
                <Button link={'/events'}>
                    Go back to all events
                </Button>
            </>
        )
    }




    if (!filteredEvents || filteredEvents.length === 0) {
        return(
        <>
            <ErrorAlert>
        <p className={'center'}>
            No Events found for the chosen filter

        </p>
            </ErrorAlert>
        <Button link={'/events'}>
            Go back to all events
        </Button>
        </>
        )
    }

    const date = new Date(numberYear, numberMonth-1)
    return (
        <>
            <Head>
                <title>
                    Filtered Events
                </title>
                <meta name={loadedEvents[0].title} content={ loadedEvents[0].description}>

                </meta>
            </Head>
            <ResultsTitle date={date}/>
            <EventList items={loadedEvents}/>
        </>
    )
}
