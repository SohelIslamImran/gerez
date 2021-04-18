import React from 'react';
import Banner from '../Banner/Banner';
import NavBar from '../NavBar/NavBar';
import './Header.css';

const Header = () => {
    return (
        <section className="header-container">
            <NavBar />
            <Banner/>
        </section>
    );
};

export default Header;