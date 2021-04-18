import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import AddService from '../components/Dashboard/AddService/AddService';
import Book from '../components/Dashboard/Book/Book';
import BookingList from '../components/Dashboard/BookingList/BookingList';
import '../components/Dashboard/Dashboard.css';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar/DashboardNavbar';
import MakeAdmin from '../components/Dashboard/MakeAdmin/MakeAdmin';
import ManageService from '../components/Dashboard/ManageService/ManageService';
import OrderList from '../components/Dashboard/OrderList/OrderList';
import Profile from '../components/Dashboard/Profile/Profile';
import Review from '../components/Dashboard/Review/Review';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const Dashboard = () => {
    const { isAdmin } = useContext(UserContext);
    const { panel } = useParams();
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className="wrapper">
            <Sidebar show={showSidebar} />
            <div id="content">
                <DashboardNavbar setShowSidebar={setShowSidebar} show={showSidebar} />
                {panel === "profile" ? <Profile />
                    : panel === "orderList" && isAdmin ? <OrderList />
                        : panel === "addService" && isAdmin ? <AddService />
                            : panel === "makeAdmin" && isAdmin ? <MakeAdmin />
                                : panel === "manageServices" && isAdmin ? <ManageService />
                                    : panel === "book" ? <Book />
                                        : panel === "bookingList" ? <BookingList />
                                            : panel === "review" ? <Review />
                                                : null}
            </div>
        </div>
    );
};

export default Dashboard;