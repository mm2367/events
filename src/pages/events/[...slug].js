import {useRouter} from "next/router";
import {getFilteredEvents} from "../../../dummy-data";
import EventList from "@/components/events/eventlist";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert/error-alert";

export default function FilteredEventsPage() {
    const router = useRouter();
    const filteredData = router.query.slug;

    if (!filteredData) {
        return (
            <p className={'center'}>
                Loading...
            </p>
        )
    }
    const filteredYear = filteredData[0]
    const filteredMonth = filteredData[1]
    const numberYear = +filteredYear
    const numberMonth = +filteredMonth
    if (isNaN(numberYear) || isNaN(numberMonth) || numberYear > 2030 || numberYear < 2021 || numberMonth < 1 || numberMonth > 12) {
        return (
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
    const filteredEvents = getFilteredEvents({year: numberYear, month: numberMonth})
    if (!filteredEvents || filteredEvents.length === 0) {
        return(
        <>
            <ErrorAlert>
        <p className={'center'}>
            No Events found for the chosen filter

        </p>
            </ErrorAlert>
        <Button link={'/event'}>
            Go back to all events
        </Button>
        </>
        )
    }
    const date = new Date(numberYear, numberMonth - 1)
    return (
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </>
    )
}