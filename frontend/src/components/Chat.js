import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import { makeStyles } from '@material-ui/core/styles';

let socket = io("http://localhost:5000/"); 

const useStyles = makeStyles({
  submit: {
    color: "white", 
    backgroundColor: "blue", 
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
  const [list, setList] = useState([]); 

  const handleMsg = (e) => {
    e.preventDefault(); 
    // Envois du msg vers le server le message. 
    socket.emit("sendMessage", message)
    setMessage("")
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  // Connection du socket et envois des messages du server dans la liste de messages. 
  useEffect(() => {
    socket.on('message', (message) => {
      setList( prev => [...prev, message])
    })
  },[])

  return (
    <div className={css.container}>
      {list.map(x => <p>{x}</p>)}
      <form onSubmit={handleMsg}>
        <input type="text" value={message} onChange={handleChange} />
        <button className={css.submit} type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default Chat;