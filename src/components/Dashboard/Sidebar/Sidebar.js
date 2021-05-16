import {
    faBook,
    faCog,
    faCommentDots,
    faFileMedical,
    faListUl,
    faShoppingCart,
    faSignOutAlt,
    faUserCircle,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import Logo from '../../../images/logo.svg';
import SidebarLoader from './SidebarLoader.js';

const Sidebar = ({ show, adminLoading }) => {
    const { isAdmin } = useContext(UserContext);
    const { panel } = useParams();
    return (
        <nav id="sidebar" className={show ? "active" : ""}>
            <div className="sidebar-header">
                <img
                    alt="Logo"
                    src={Logo}
                    width="42"
                    height="42"
                    className="d-inline-block align-top"
                />{' '}
                <h2 className="d-inline-block">Gerez</h2>
            </div>
            {adminLoading ? <SidebarLoader /> :
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard/profile" className={panel === "profile" ? "link-active" : ""}>
                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "1.3rem" }} /> <span>Profile</span>
                        </Link>
                    </li>
                    {isAdmin ?
                        <>
                            <li>
                                <Link to="/dashboard/orderList" className={panel === "orderList" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faListUl} /> <span>Order List</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addService" className={panel === "addService" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faFileMedical} /> <span>Add Service</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/makeAdmin" className={panel === "makeAdmin" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manageServices" className={panel === "manageServices" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faCog} /> <span>Manage Services</span>
                                </Link>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link to="/dashboard/book" className={panel === "book" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> <span>Book</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/bookingList" className={panel === "bookingList" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faBook} /> <span>Booking List</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/review" className={panel === "review" ? "link-active" : ""}>
                                    <FontAwesomeIcon icon={faCommentDots} /> <span>Review</span>
                                </Link>
                            </li>
                        </>}
                </ul>}
            <ul className="list-unstyled CTAs">
                <li>
                    <Link to="/" className="back-home btn-main text-white">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Back to Home
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;