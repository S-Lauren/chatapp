import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Nav from './Nav';
import { useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
import socket from '../utils/ioSocket'; 


const useStyles = makeStyles({
  submit: {
    color: "white", 
    backgroundColor: "#2acccc", 
    border: "none",
    width: "200px", 
    height: "20px", 
    marginLeft: '10px'
  }, 
  container: {
    backgroundColor: '#444444',
    padding: '40px 0 0 40px',
    marginTop: '0', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'left'
  },
  user: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: "900", 
    fontSize: '20px',
    margin: '0'
  },
  chatBody: {
    backgroundColor: '#444444', 
    width: '100%',
    height: '100vh'
  },
  date:    {
    fontSize: "10px",
    marginLeft: '10px'
  },
  message: {
    fontFamily: 'Roboto', 
    color: 'white',
    margin: '0',
    paddingTop: '10px',
    paddingBottom: '15px'
  },
  form: {
    width: '100%',
    color: 'black',
    background: 'black',
    height: '50px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  },
  input: {
    width: "40vw",
    marginLeft: '20px'
  }
})


const Chat = () => {

  const css = useStyles()
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]); 

  /* URL Search params + queryString to get current user and room */

  const  queryString = new URLSearchParams(useLocation().search)
  const username = queryString.get("username"); 
  const room = queryString.get("room"); 
  

  /* On SendMessage event, I send from client => username, message content from input, date and the room from queryString */

  const handleMsg = (e) => {
    e.preventDefault(); 
    socket.emit("sendMessage", {user: username, message: message, date: new Date(), room: parseInt(room)}) 
    setMessage("")
  }

  /* Retrieve the message content from user input with synthetic event */

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  /* Retrieve from the server the top ten message */

  useEffect(()=> {
    socket.on('sendMsg', (message) => {
      setList([...message])
    })
  },[list])

  const newList = list.flat(3)

  return (
    <>
    <Nav room={room}/>
    <div className={css.chatBody}>
    <div className={css.container}>
      {newList.map(x => {
        return (
        <>
          <p className={css.user}>{x.username}
          <em className={css.date}>{new Date(x.date).toLocaleString(DateTime.DATETIME_MED)}</em>
          </p>
          <p className={css.message}> {x.content}</p>
        </>
        )}
      )}
      </div>
      </div>
      <div className={css.form}>
        <form onSubmit={handleMsg}>
          <input className={css.input} type="text" value={message} onChange={handleChange} />
          <button className={css.submit} type="submit" placeholder="Send your message ">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Chat;