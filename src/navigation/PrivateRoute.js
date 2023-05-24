import { Navigate, Route, useLocation } from "react-router-dom";
import { useAppContext } from "../context";

// Private routes can be used like this in v6.
const PrivateRoute = ({ element, children, ...rest }) => {
    const {
        loggedInUser: { isSignedIn },
    } = useAppContext();
    const location = useLocation();

    return (
        <Route
            {...rest}
            element={isSignedIn ? element : <Navigate to="/login" state={{ from: location }} />}
        >
            {children}
        </Route>
    );
};

export default PrivateRoute;
