import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import battery from '../../../images/battery.svg';
import carRepair from '../../../images/car-repair.svg';
import check from '../../../images/check.svg';
import service from '../../../images/service.svg';
import turboEngine from '../../../images/turbo-engine.svg';
import tyre from '../../../images/tyre.svg';
import PricingItem from '../PricingItem/PricingItem';
import './ServicePricing.css';


const ServicePricing = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('https://gerez-server.herokuapp.com/services')
            .then(res => {
                setServices(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div className="pricing-section" id="pricing">
            <Container className="my-md-5">
                <Col xs={12}>
                    <div className="pricing-title text-center">
                        <span>Best Pricing Plan</span>
                        <h2>Services Packages</h2>
                    </div>
                </Col>
                <Row>
                    <Col xs={12}>
                        <Tab.Container defaultActiveKey="1">
                            <Nav className="pricing-nav">
                                <Nav.Item className="pricing-content-1">
                                    <Nav.Link eventKey="1">
                                        <img alt="" src={turboEngine} width="35" height="35" />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pricing-content-2">
                                    <Nav.Link eventKey="2">
                                        <img alt="" src={tyre} width="40" height="40" />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pricing-content-3">
                                    <Nav.Link eventKey="3">
                                        <img alt="" src={carRepair} width="35" height="35" />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pricing-content-4">
                                    <Nav.Link eventKey="4">
                                        <img alt="" src={check} width="40" height="40" />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pricing-content-5">
                                    <Nav.Link eventKey="5">
                                        <img alt="" src={battery} width="36" height="36" />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pricing-content-6">
                                    <Nav.Link eventKey="6">
                                        <img alt="" src={service} width="40" height="40" />
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                {
                                    services.map((data, idx) => <PricingItem key={idx} id={idx} data={data} />)
                                }
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ServicePricing;