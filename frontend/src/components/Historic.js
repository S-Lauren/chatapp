import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';


export function generateRandomColor() {
  var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
  //random color will be freshly served
}
const useStyles = makeStyles({
  username: {
    margin: '0',
    fontWeight: "900", 
    fontFamily: "roboto",
    fontSize: '20px',
    color: '#d1d1d1'
  }, 
  date: {
    fontSize: "10px",
    marginLeft: '10px'
  }, 
  messages: {
    paddingTop: '50px',
    marginLeft: "20px"
  }, 
  content: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '10px',

  }
  
})



const Historic = ({room}) => {
  // fetch all message from a certain room
  const [lastMessage, setLastMessage] = useState([])

  const css = useStyles()
  
  useEffect(() => {
    fetch(`http://localhost:5000/rooms/${room}/lastMessages`)
    .then((response) => response.json())
    .then((data) => setLastMessage(prev => [...prev, data]))
    .catch((error) => console.log('Fetch Error:', error))
  }, [])

  const lastMsg = lastMessage.flat(3); 

  return (
    <div className={css.messages}>
      {/* Here We gonna display just 10 last messages*/}
      {lastMsg
      .filter(x => x.hasOwnProperty("content"))
      .map(x => {
        return (
          <>
            <p className={css.username}> {x.username} 
            <em className={css.date}>{new Date(x.date).toLocaleString(DateTime.DATETIME_MED)}</em></p>
            <p className={css.content}> <em>{x.content}</em> </p>
          </>
        )
      })}
    </div>
  );
};

export default Historic;