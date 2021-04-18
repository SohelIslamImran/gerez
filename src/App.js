import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import Login from './pages/Login';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [selectedService, setSelectedService] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/isAdmin?email=${loggedInUser?.email}`)
      .then(res => setIsAdmin(res.data))
      .catch(error => console.log(error))
  }, [loggedInUser?.email]);
  
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isAdmin, selectedService, setSelectedService }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/dashboard/:panel">
            <Dashboard />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
