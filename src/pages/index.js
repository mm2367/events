import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import EventList from "@/components/events/eventlist";
import {getFeaturedEvents} from "@/helpers/api-utils";
import NewsletterRegistration from "@/components/input/newsletter-registration";

const inter = Inter({subsets: ['latin']})

export default function Home(props) {
    return (
        <>
            <Head>
                <title>
                    All Events
                </title>
                    <meta name={'NextJs'} content={'Find a lot of great events'}>

                    </meta>
            </Head>
            <NewsletterRegistration/>
            <EventList items={props.events}/>
        </>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}
