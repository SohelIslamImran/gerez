import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import LoadingSpinner from "./components/Home/LoadingSpinner/LoadingSpinner";
import { getDecodedUser } from "./components/Login/LoginManager";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import Login from './pages/Login';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(getDecodedUser());
  const [selectedService, setSelectedService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get(`https://gerez-server.herokuapp.com/isAdmin?email=${loggedInUser?.email}`)
      .then(res => setIsAdmin(res.data))
      .catch(error => console.log(error))
  }, [loggedInUser?.email]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isAdmin, selectedService, setSelectedService }}>
      <Router>
        <Toaster />
        <Switch>
          <Route exact path="/">
            {loading ? <LoadingSpinner /> : <Home />}
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
