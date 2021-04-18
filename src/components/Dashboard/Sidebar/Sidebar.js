import { faCog, faFileMedical, faListUl, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import Logo from '../../../images/logo.svg';

const Sidebar = ({ show }) => {
    const { isAdmin } = useContext(UserContext);
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
            <ul className="list-unstyled components">
                <li>
                    <Link to="/dashboard/profile">
                        <FontAwesomeIcon icon={faListUl} /> <span>Profile</span>
                    </Link>
                </li>
                {isAdmin ?
                    <>
                        <li>
                            <Link to="/dashboard/orderList">
                                <FontAwesomeIcon icon={faListUl} /> <span>Order List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/addService">
                                <FontAwesomeIcon icon={faFileMedical} /> <span>Add Service</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/makeAdmin">
                                <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/manageServices">
                                <FontAwesomeIcon icon={faCog} /> <span>Manage Services</span>
                            </Link>
                        </li>
                    </>
                    : <>
                        <li>
                            <Link to="/dashboard/book">
                                <FontAwesomeIcon icon={faCog} /> <span>Book</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/bookingList">
                                <FontAwesomeIcon icon={faCog} /> <span>Booking List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/review">
                                <FontAwesomeIcon icon={faCog} /> <span>Review</span>
                            </Link>
                        </li>
                    </>}
            </ul>
            <ul className="list-unstyled CTAs">
                <li>
                    <Link to="/" className="back-home">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Back to Home
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;