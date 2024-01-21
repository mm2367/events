import MainHeader from "@/components/layout/main-header";
import Notification from "@/components/notification/notification";
import {useContext} from "react";
import NotificationContext from "../../../store/notification-context";

export default function Layout(props){
    const notificationContext=useContext(NotificationContext)
    const activeNotification=notificationContext.notification

    return (
        <>
            <MainHeader/>
            <main>
                {props.children}
            </main>
            {activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status}/>}
        </>
    )
}