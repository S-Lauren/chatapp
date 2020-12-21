import React from 'react'; 
import io from 'socket.io-client'; 
import Chat from './Chat';

let socket = io("http://localhost:5000/")

socket.on("msg",() => {
  console.log("hello")
})

function App() {
  return (
    <div>
      hello React ! Glad to see you 
      <Chat/>
    </div>
  );
}

export default App;
