import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


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


const Join = () => {

  const css = useStyles(); 
  const [username, setUsername] = useState(""); 
  const [room, setRoom]= useState(''); 
  const [test, setTest]= useState([]); 

// Fetch API call allRooms 

  useEffect(() => {
    fetch('http://localhost:5000/rooms')
    .then((response) => response.json())
    .then((data) => setTest(prev => [...prev, data]))
    .catch((error) => console.log('Fetch Error:', error))
  }, []); 

  // flatten the array of room from db
  const arr = test.flat(3);
  const roomName =  arr.map(x => x.name)

  return (
    <div className={css.container}>
      <form className={css.form}>
        <label className={css.label}> Enter a room id </label>
        <select onChange={(e) => setRoom(e.target.value)}>
          <option selected="selected"></option>
          {arr.map(x => <option value={x.id}>{x.name}</option>)}
        </select>
        <label className={css.label}> username  </label>
        <input className={css.input} type="text" placeholder="enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <Link onClick={(e) => (!username || !room) ?  e.preventDefault() : null} 
        to={`/chat?room=${room}&username=${username}`} >
          <button className={css.btn} type="submit">Connection</button>
        </Link>
      </form>
    </div>
  );
};

export default Join;