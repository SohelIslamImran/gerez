import React from 'react';
import { Card } from 'react-bootstrap';

const Testimonial = ({ testimonial: { name, address, img, description } }) => {
    return (
        <Card className="my-4">
            <Card.Img variant="top" src={img} width="60" />
            <Card.Body className="text-center">
                <h5>{name} <br />
                    <span>{address}</span>
                </h5>
                <Card.Text>{description.slice(0, 165)}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Testimonial;