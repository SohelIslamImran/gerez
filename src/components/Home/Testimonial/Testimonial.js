import React from 'react';
import { Card, Col } from 'react-bootstrap';

const Testimonial = ({ testimonial }) => {
    const { name, address, img, description } = testimonial;
    return (
        <Col md={4}>
            <Card className="my-4">
                <Card.Img variant="top" src={img} width="60" />
                <Card.Body className="text-center">
                    <h5>{name} <br />
                        <span>{address}</span>
                    </h5>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Testimonial;