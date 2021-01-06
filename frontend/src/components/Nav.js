import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../utils/ioSocket';


const useStyles = makeStyles({
  root: {
    background: "black", 
    width: '100%',
    height: '70px', 
    margin: '0', 
    padding: '0', 
    color: 'white',
    display: "flex",
    alignItems: "center" 
  },
  nav: {
    margin: "0",
    listStyle: "none",
    display: "flex",
    alignItems: 'center'
  },
  menu: {
    display: "flex",
    alignItems: 'center',
    marginLeft: "10px",
    fontFamily: "Roboto",
    '&:nth-child(2)': {
      marginLeft: "50px", 
      justifyContent: 'flex-end'
    }
  },
  online: {
    color: '#41c144'
  } 
})

const Nav = ({room}) => {

const [numUser, setNumUser] = useState([])

  useEffect(() => {
    socket.on("getNumOfClient", (num) =>  {
      console.log(num)
      setNumUser(num)
    })
  }, [numUser])

  useEffect(() => {
    socket.on("updateNumber", (num) => {
      setNumUser(num)
    })
  }, [numUser])

console.log(numUser[room])
  const css = useStyles(); 
  return (
    <div className={css.root}>
        <ul className={css.nav}>
          <li className={css.menu}>
            #Room-{room}
          </li> 
          <li className={css.menu}>
            <span className={css.online}> 🍉 {numUser[room]} users online </span>
          </li> 
        </ul>
    </div>
  );
};

export default Nav;