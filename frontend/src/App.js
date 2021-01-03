import React from 'react'; 
import Chat from './components/Chat';
import './App.css'; 
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import Join from './components/Join';
import Historic from './components/Historic';

function App() {
  return (
    <>
    {/* Routing here...  */}
      <Router>
        <Route exact path="/" component={Join}/>
        <Route exact path="/chat/:room?/:username?" component={Chat}/>
        <Route exact path="/historic" component={Historic}/>
      </Router>
    </>
  );
}

export default App;
