import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AddReview from "../components/dashboard/AddReview";
import AddService from "../components/dashboard/AddService";
import Book from "../components/dashboard/Book";
import BookingList from "../components/dashboard/BookingList";
import DashboardLoader from "../components/dashboard/DashboardLoader";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import MakeAdmin from "../components/dashboard/MakeAdmin";
import ManageService from "../components/dashboard/ManageService";
import OrderList from "../components/dashboard/OrderList";
import Profile from "../components/dashboard/Profile";
import Review, { EditReview } from "../components/dashboard/Review";
import ReviewLoader from "../components/dashboard/ReviewLoader";
import Sidebar from "../components/dashboard/Sidebar";
import { useAppContext } from "../context";

const Dashboard = ({ adminLoading }) => {
    const {
        loggedInUser: { email },
        isAdmin,
    } = useAppContext();
    const { panel } = useParams();
    const history = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [loadingReview, setLoadingReview] = useState(true);
    const [review, setReview] = useState({});
    const [reviewEdit, setReviewEdit] = useState(false);

    if (
        !adminLoading &&
        !isAdmin &&
        (panel === "orderList" ||
            panel === "addService" ||
            panel === "makeAdmin" ||
            panel === "manageServices")
    ) {
        history.replace({ pathname: "/dashboard/profile" });
    }

    if (
        !adminLoading &&
        isAdmin &&
        (panel === "book" || panel === "bookingList" || panel === "review")
    ) {
        history.replace({ pathname: "/dashboard/profile" });
    }

    useEffect(() => {
        axios
            .get(`https://gerez-server.herokuapp.com/reviews?email=${email}`)
            .then((res) => {
                setReview(res.data);
                setLoadingReview(false);
            })
            .catch((error) => toast.error(error.message));
    }, [email, reviewEdit, review]);

    return (
        <main className="wrapper">
            <Sidebar show={showSidebar} adminLoading={adminLoading} />
            <div id="content">
                <DashboardNavbar setShowSidebar={setShowSidebar} show={showSidebar} />
                {adminLoading ? (
                    <DashboardLoader />
                ) : panel === "profile" ? (
                    <Profile />
                ) : panel === "orderList" && isAdmin ? (
                    <OrderList />
                ) : panel === "addService" && isAdmin ? (
                    <AddService />
                ) : panel === "makeAdmin" && isAdmin ? (
                    <MakeAdmin />
                ) : panel === "manageServices" && isAdmin ? (
                    <ManageService />
                ) : panel === "book" ? (
                    <Book />
                ) : panel === "bookingList" ? (
                    <BookingList />
                ) : panel === "review" && loadingReview ? (
                    <ReviewLoader />
                ) : panel === "review" && review.name && !reviewEdit ? (
                    <Review review={review} setEdit={setReviewEdit} />
                ) : panel === "review" && reviewEdit ? (
                    <EditReview review={review} edit={reviewEdit} setEdit={setReviewEdit} />
                ) : panel === "review" ? (
                    <AddReview setReview={setReview} />
                ) : null}
            </div>
        </main>
    );
};

export default Dashboard;
