
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Notestate from './notesContext/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import User from './components/User';

function App() {
  return (
    <>
    <Notestate>
       <Router>
        <Navbar/>
       <Switch>
       <Route path="/signup">
          <Signup/>
          </Route>
       <Route path="/login">
          <Login/>
          </Route>

          <Route path="/about">
          <About/>
          </Route>
          <Route path="/">
            <User/>
            <Home/>
          </Route>
        </Switch>
       </Router>
       </Notestate>
    </>
  );
}

export default App;
