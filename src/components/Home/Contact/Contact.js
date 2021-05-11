import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <Container className="">
                <div className="text-center">
                    <h1>contact us</h1>
                    <h4>We'd love to hear from you!</h4>
                </div>
                <Row className="input-container">
                    <Col xs={12}>
                        <div className="styled-input wide">
                            <input type="text" required />
                            <label>Name</label>
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="styled-input">
                            <input type="text" required />
                            <label>Email</label>
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="styled-input" style={{ float: "right" }}>
                            <input type="text" required />
                            <label>Phone Number</label>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className="styled-input wide">
                            <textarea required></textarea>
                            <label>Message</label>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className="btn-lrg submit-btn btn-main">Send Message</div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;