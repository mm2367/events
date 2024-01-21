import {createContext, useEffect, useState} from "react";
import {act} from "react-dom/test-utils";
const NotificationContext=createContext({
    notification:null,
    showNotification:function(notificationDate){

    },
    hideNotification:function(){

    }

})
export function NotificationContextProvider(props){
    const [activeNotification,setActiveNotification]=useState();

    useEffect(()=>{
        if(activeNotification && (activeNotification.status==='success' || activeNotification.status==='error')){
            const timer=setTimeout(()=>{
                setActiveNotification(null)
            },3000)
            return()=>{
                clearTimeout(timer)
            }
        }
    },[activeNotification])
    function showActiveNotificationHandler(notifData){
        setActiveNotification(notifData)

    }
    function hideActiveNotificationHandler(){
        setActiveNotification(null)
    }

    const context = {
        notification: activeNotification,
        showNotification: showActiveNotificationHandler,
        hideNotification: hideActiveNotificationHandler
    }
    return(
    <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>
)
}
export default NotificationContext;