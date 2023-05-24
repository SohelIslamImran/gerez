import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import ServicePricing from "./ServicePricing";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Home = () => (
    <main>
        <Header />
        <About />
        <Services />
        <ServicePricing />
        <Testimonials />
        <Contact />
        <Footer />
    </main>
);

export default Home;
