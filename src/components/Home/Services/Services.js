import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ServiceDetail from '../ServiceDetail/ServiceDetail';
import './Services.css';

const Services = () => {
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
        <section className="text-center services-container py-5">
            <h5>What We Do</h5>
            <h1>Services We Provide</h1>
            <Row className="justify-content-center mx-auto mt-md-5 pt-5">
                {
                    services.map(service => <ServiceDetail key={service._id} service={service} />)
                }
            </Row>
        </section>
    );
};

export default Services;