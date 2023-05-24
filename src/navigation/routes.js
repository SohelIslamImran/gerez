import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/home/LoadingSpinner";
import Dashboard from "../pages/Dashboard";

const Home = lazy(() => import("../components/home"));
const Login = lazy(() => import("../components/login"));
const Profile = lazy(() => import("../components/dashboard/Profile"));
const Book = lazy(() => import("../components/dashboard/Book"));
const BookingList = lazy(() => import("../components/dashboard/BookingList"));
const Review = lazy(() => import("../components/dashboard/Review"));
// const AddReview = lazy(() => import("../components/dashboard/AddReview"));
const OrderList = lazy(() => import("../components/dashboard/OrderList"));
const AddService = lazy(() => import("../components/dashboard/AddService"));
const MakeAdmin = lazy(() => import("../components/dashboard/MakeAdmin"));
const ManageService = lazy(() => import("../components/dashboard/ManageService"));

const getAdminElement = (loading, isAdmin, Component) => {
    return loading ? <LoadingSpinner /> : isAdmin ? Component : <Navigate to="/profile" />;
};

const routes = (isLoggedIn, loading, isAdmin, location) => [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" state={{ from: location }} />,
        children: [
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "book",
                element: <Book />,
            },
            {
                path: "bookingList",
                element: <BookingList />,
            },
            {
                path: "review",
                element: <Review />,
            },
            {
                path: "orderList",
                element: getAdminElement(loading, isAdmin, <OrderList />),
            },
            {
                path: "addService",
                element: getAdminElement(loading, isAdmin, <AddService />),
            },
            {
                path: "makeAdmin",
                element: getAdminElement(loading, isAdmin, <MakeAdmin />),
            },
            {
                path: "manageServices",
                element: getAdminElement(loading, isAdmin, <ManageService />),
            },
        ],
    },
];

export default routes;
