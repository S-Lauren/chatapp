import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import { makeStyles } from '@material-ui/core/styles';
import Nav from './Nav';
import { useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
import Historic, { generateRandomColor } from './Historic';
let socket = io("http://localhost:5000/"); 

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
    paddingLeft: '20px',
    marginTop: '0'
  },
  user: {
    color: generateRandomColor(),
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

/*
  Ici il faudra sur l'évenement message/send message, passer la requete côté serveur et envoyer la roomId, le user, message 
  dans la requete. 
*/
const Chat = () => {

  const css = useStyles()
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]); 
 
  // URL Search params to get current user and room
  const  queryString = new URLSearchParams(useLocation().search)
  const username = queryString.get("username"); 
  const room = queryString.get("room"); 
  

  // Sur l'event sendMessage, j'envoie les variables username et messages pour définir les parametres
  const handleMsg = (e) => {
    e.preventDefault(); 
    socket.emit("sendMessage", {user: username, message: message, date: new Date(), room: parseInt(room)}) //=> '20 avril 2017 à 11:32 UTC−4'})
    setMessage("")
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  // Sur l'event message, j'envoie les paramètres user et messages
  useEffect(() => {
    socket.on('message', ({user, message, date, room}) => {
      // push message into a list. 
    setList( prev => [...prev, {user, message, date, room}])
    })
  },[])


  return (
    <>
    <Nav room={room}/>
    <div className={css.chatBody}>
      <Historic room={room}/>
    </div>
    <div className={css.container}>
      {list.map(x => {
        return (
        <>
          <p className={css.user}>{x.user}
          <em className={css.date}>{new Date(x.date).toLocaleString(DateTime.DATETIME_MED)}</em>
          </p>
          <p className={css.message}> {x.message}</p>
        </>
        )}
      )}
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