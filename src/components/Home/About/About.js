import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import aboutImg from '../../../images/about.png';
import './About.css';

const About = () => {
    return (
        <section className="about-container">
            <Container fluid>
                <Row className="align-items-center justify-content-center banner">
                    <Col md={6} className="">
                        <Image src={aboutImg} fluid />
                    </Col>
                    <Col md={4} className="p-md-5 mt-md-0 mt-4">
                        <p>About Our Company</p>
                        <h3>How We Can Help you</h3>
                        <p className="text-muted my-4 pr-md-5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,</p>
                        <Button
                            as={Link}
                            className="shadow-none border-0"
                            to="/appointment">
                            Learn More
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default About;