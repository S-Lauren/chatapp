import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]); 

  const handleMsg = (e) => {
    // une fois le message submit, je reset la value
    e.preventDefault(); 
    setMessage("")
    setList( prev => [...prev, message])
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
 

  return (
    
    <div>
      {list.map(x => <p>{x}</p>)}
      <form onSubmit={handleMsg}>
        <input type="text" value={message} onChange={handleChange} />
        <button  type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default Chat;