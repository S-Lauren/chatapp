import React from 'react'; 
import io from 'socket.io-client'; 
import Chat from './components/Chat';
import Nav from './components/Nav';
import './App.css'; 
let socket = io("http://localhost:5000/")

socket.on("msg",() => {
  console.log("hello")
})

function App() {
  return (
    <>
      <Nav/>
      <Chat/>
    </>
  );
}

export default App;
