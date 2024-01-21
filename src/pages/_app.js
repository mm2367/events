import '@/styles/globals.css'
import Layout from "@/components/layout/layout";
import Head from "next/head";
import Notification from "@/components/notification/notification";
import  {NotificationContextProvider} from "../../store/notification-context";

export default function App({ Component, pageProps }) {
  return(
      <NotificationContextProvider>
          <Layout>
              <Head>
                  <title>
                      Next JS Events
                  </title>
                  <meta name={'viewport'} content={'initial-scale=1.0, width=device-width'}>
                  </meta>
              </Head>
              <Component {...pageProps} />
          </Layout>
      </NotificationContextProvider>

  )
}
