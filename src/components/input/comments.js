import {useContext, useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(true);
  const [comments,setComments]=useState([]);
  const notificationCtx=useContext(NotificationContext);
  const [isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    if(showComments){
      fetch('/api/comments/'+eventId).then((response)=>response.json())
          .then((data)=>{
            setComments(data.comments)
          })
    }
  }, [eventId,showComments, isLoading]);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    if(!showComments){

    }
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification(
        {title: 'Sending Comment',
          message: 'Your comment is currently being stored',
          status: 'pending'})
      setIsLoading(true)
    // send data to API
    fetch('/api/comments/'+eventId,{
      method:'POST',
       body:JSON.stringify(commentData),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=> {
      if (response.ok) {
        return response.json()
      }
      return response.json().then(data=>{
        throw new Error(data.message || 'We encountered an error')
      })
    })
        .then(data=> {
          setIsLoading(false)
          notificationCtx.showNotification(
              {title: 'Success',
                message: 'Your comment has been added',
                status: 'success'})
        }).catch(error=>{
        notificationCtx.showNotification(
          {title: 'Error',
            message: error.message || 'Error adding comment',
            status: 'error'})
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments  && !isLoading && <CommentList items={comments} />}
      {showComments && isLoading && <p> Is Loading</p>}
    </section>
  );
}

export default Comments;
