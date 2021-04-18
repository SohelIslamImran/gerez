import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './ServiceDetail.css';

const ServiceDetail = ({ service }) => {
    const { setSelectedService, isAdmin } = useContext(UserContext);
    const { title, image, description, price } = service;
    return (
        <div className="col-md-4 mb-5 text-center service-detail">
            <Card
                className="border-0 py-4"
                style={{ maxWidth: '25rem' }}>
                <Card.Img variant="top" height="100" src={image} style={{ objectFit: "contain" }} />
                <Card.Body className="pt-0">
                    <Card.Title as="h4" className="my-4">{title}</Card.Title>
                    <Card.Text className="text-muted">{description}</Card.Text>
                    <div>
                        <p>${price}</p>
                        <Button
                            as={Link}
                            to={isAdmin ? "/dashboard/orderList" : "/dashboard/book"}
                            onClick={() => setSelectedService(service)}>
                            Book Now
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ServiceDetail;