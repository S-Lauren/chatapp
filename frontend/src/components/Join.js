import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// const font =  "'Roboto', cursive";


const useStyles = makeStyles({
  container: {
    width: "100%", 
    height: "100vh",
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(#121317, #323B42)"
  }, 
  form: {
    display: 'flex', 
    flexDirection: "column", 

  }, 
  label: {
    fontFamily: "Roboto", 
    color: "white",
    fontSize: "25px",
    textAlign: "center"
  }, 
  input: {
    outline: "none", 
    marginTop: "20px",
    marginBottom: "20px",
    width: "200px",
    height: "30px"
  },
  btn: {
    border: 'none',
    background: "#47d35f",
    color: "white",
    width: "200px",
    height:"30px",
    borderRadius: "50px", 
    cursor: "pointer",
    marginTop: '15px',
    fontFamily: "Roboto", 
    outline: "none"
  }
}); 

// Ici un socket pour la room et le user, afin de faire les vérifications. (callback, si la room existe déjà, + vérifs users)
const Join = () => {
  const css = useStyles(); 
  const [username, setUsername] = useState(""); 
  const [room, setRoom]= useState(''); 

  return (
    <div className={css.container}>
      <form className={css.form}>
        <label className={css.label}> Enter a room id </label>
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option>1</option>
          <option>2</option>
        </select>
        <label className={css.label}> username  </label>
        <input className={css.input} type="text" placeholder="enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <Link onClick={(e) => (!username || !room) ?  e.preventDefault() : null} to={`/chat?room=${room}&username=${username}`} >
          <button className={css.btn} type="submit">Connection</button>
        </Link>
      </form>
    </div>
  );
};

export default Join;