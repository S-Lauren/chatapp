import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: "black", 
    width: '100%',
    height: '70px', 
    margin: '0', 
    padding: '0', 
    color: 'white' 
  }
})

const Nav = () => {
  const css = useStyles(); 
  return (
    <div className={css.root}>
        im a navbar
    </div>
  );
};

export default Nav;