import React from 'react';
import { Col, Row, Tab } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import carImg from '../../../images/car-img.png';

const PricingItem = ({ data: { title, price, description }, id }) => {
    return (
        <Tab.Pane eventKey={id + 1}>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <Fade bottom duration={2000} distance="40px">
                        <div className={`pricing-img-${id + 1}`}>
                            <div className={`pricing-text-${id + 1}`}>
                                <span><small>$</small>{price}</span>
                                <h4><Link to="/">{title}</Link></h4>
                                <p>{description.slice(0, 94)}</p>
                            </div>
                            <img src={carImg} alt="" />
                        </div>
                    </Fade>
                </Col>
            </Row>
        </Tab.Pane>
    );
};

export default PricingItem;