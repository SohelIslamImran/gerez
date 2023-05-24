import Banner from "./Banner";
import NavBar from "./NavBar";

const Header = () => {
    return (
        <section className="header-container">
            <NavBar />
            <Banner />
        </section>
    );
};

export default Header;
