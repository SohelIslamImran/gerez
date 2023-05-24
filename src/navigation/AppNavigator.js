import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useRoutes } from "react-router-dom";
import LoadingSpinner from "../components/home/LoadingSpinner";
import { useAppContext } from "../context";
import routes from "./routes";

const AppNavigator = () => {
    const {
        loggedInUser: { isSignedIn },
        adminLoading,
        isAdmin,
    } = useAppContext();
    const location = useLocation();
    const navigation = useRoutes(routes(isSignedIn, adminLoading, isAdmin, location));

    return (
        <>
            <Toaster />
            <Suspense fallback={<LoadingSpinner />}>{navigation}</Suspense>
        </>
    );
};

export default AppNavigator;
