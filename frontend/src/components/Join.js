import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: "100px", 
    heigth: "100vh", 
    backgroundColor: "blue"
  }
}); 


const Join = () => {
  const css = useStyles(); 
  const [username, setUsername] = useState(""); 
  const [room, setRoom]= useState(""); 

  return (
    <div className={css.container}>
      <form>
        <label> Enter a room id </label>
        <input type="text" placeholder="your room id" value={room} onChange={(e) => setRoom(e.target.value)}/>
        <label> username  </label>
        <input type="text" placeholder="enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <Link onClick={(e) => (!username || !room) ?  e.preventDefault() : null} to={`/chat?room=${room}&username=${username}`} >
          <button type="submit">Connection</button>
        </Link>
      </form>
    </div>
  );
};

export default Join;