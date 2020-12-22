import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import { makeStyles } from '@material-ui/core/styles';
import Nav from './Nav';
import { useLocation } from 'react-router-dom';

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
  }
})


const Chat = () => {

  const css = useStyles()
  const [message, setMessage] = useState("");
  const [list, setList] = useState({}); 
  const [user, setUser] = useState([]); 
  // URL Search params to get current user and room
  const  queryString = new URLSearchParams(useLocation().search)
  const username = queryString.get("username"); 
  const room = queryString.get("room"); 
  console.log(username, room)


  const handleMsg = (e) => {
    e.preventDefault(); 
    // Envois du/des msg de l'utilisateur vers le server socket. 
    socket.emit("sendMessage", message )
    // emit user
    // socket.emit("getUser", username)

    setMessage("")
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  // Envois des messages sur l'event message sous parametre. 
  useEffect(() => {
    socket.on('message', ( message) => {
      // update la liste de message courant. 
      setList( prev => [...prev, message])
  
    })
    // event pour user
    // socket.on("user", (user) => {
    //   setUser(prev => [...prev, user])
    // })
  },[])

  return (
    <>
    <Nav/>
    <div className={css.container}>
      {user.map(x => <p>{x}</p>)}
      {list.map(x => <p>{x}</p>)}
      <form onSubmit={handleMsg}>
        <input type="text" value={message} onChange={handleChange} />
        <button className={css.submit} type="submit" placeholder="Send your message ">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Chat;