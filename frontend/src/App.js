import React from 'react'; 
import Chat from './components/Chat';
import './App.css'; 
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import Join from './components/Join';

function App() {
  return (
    <>
    {/* Routing here...  */}
      <Router>
        <Route exact path="/" component={Join}/>
        <Route exact path="/chat" component={Chat}/>
      </Router>
    </>
  );
}

export default App;
