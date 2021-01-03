import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Historic from './Historic';
import { Link } from 'react-router-dom';

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
      marginLeft: "50px"
    }
  } 
})

const Nav = ({room}) => {
  const css = useStyles(); 
  return (
    <div className={css.root}>
        <ul className={css.nav}>
          <li className={css.menu}>
            #Room-{room}
          </li>
          
            <li className={css.menu}>Historic</li>
 
        </ul>
    </div>
  );
};

export default Nav;