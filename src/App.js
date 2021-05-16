import axios from "axios";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import LoadingSpinner from "./components/Home/LoadingSpinner/LoadingSpinner";
import { getDecodedUser } from "./components/Login/LoginManager";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(getDecodedUser());
  const [selectedService, setSelectedService] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get(`https://gerez-server.herokuapp.com/isAdmin?email=${loggedInUser?.email}`)
      .then(res => {
        setIsAdmin(res.data);
        setAdminLoading(false);
      })
      .catch(error => toast.error(error.message))
  }, [loggedInUser?.email]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isAdmin, selectedService, setSelectedService }}>
      <Router>
        <Toaster />
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/dashboard/:panel">
              <Dashboard adminLoading={adminLoading} />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
