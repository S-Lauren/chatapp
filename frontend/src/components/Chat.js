import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import { makeStyles } from '@material-ui/core/styles';
import Nav from './Nav';
import { useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
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
    marginTop: '20px', 
    marginLeft: "20px"
  },
  user: {
    color: 'Black',
    fontFamily: 'Roboto'
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
    socket.emit("sendMessage", {user: username, message: message, date: DateTime.local().toLocaleString(DateTime.DATETIME_MED)}) //=> '20 avril 2017 à 11:32 UTC−4'})
    setMessage("")
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  // Sur l'event message, j'envoie les paramètres user et messages
  useEffect(() => {
    socket.on('message', ({user, message, date}) => {
      // push message into a list. 
      setList( prev => [...prev, {user, message, date}])
    })
  },[])

console.log(list)
  return (
    <>
    <Nav room={room}/>
    <div className={css.container}>
      {list.map(x => {
        return (
        <>
          <p> {x.date}</p>
          <p className={css.user}>{x.user}</p>
          <p> {x.message}</p>
        </>
        )}
      )}
      <form onSubmit={handleMsg}>
        <input type="text" value={message} onChange={handleChange} />
        <button className={css.submit} type="submit" placeholder="Send your message ">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Chat;