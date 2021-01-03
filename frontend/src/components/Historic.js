import React, { useEffect, useState } from 'react';

const Historic = ({room}) => {
  // fetch all message from a certain room
  const [lastMessage, setLastMessage] = useState([])
  console.log(room)
  useEffect(() => {
    fetch(`http://localhost:5000/rooms/${room}/lastMessages`)
    .then((response) => response.json())
    .then((data) => setLastMessage(prev => [...prev, data]))
    .catch((error) => console.log('Fetch Error:', error))
  }, [])
  console.log(lastMessage)
  const lastMsg = lastMessage.flat(3); 

  return (
    <div>
      {/* Here We gonna display just 10 last messages*/}
      {lastMsg.map(x => {
        return (<>
          <p> {x.date} </p>
          <p> {x.username} </p>
          <p> {x.content} </p>
        </>
        )
      })}
    </div>
  );
};

export default Historic;