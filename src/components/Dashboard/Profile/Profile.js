import React, { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import { UserContext } from '../../../App';

const Profile = () => {
    const { loggedInUser } = useContext(UserContext);
    const { name, email, photo } = loggedInUser;
    return (
        <Container style={{ maxWidth: "30rem" }}>
            <Card className="border-0 shadow">
                <Card.Header as={"h4"} className="text-center border-0 mt-1">Profile</Card.Header>
                <Card.Body className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        <img src={photo} alt="Admin" class="rounded-circle" width="150" />
                        <div className="mt-3">
                            <h4>{name}</h4>
                            <p className="text-secondary mb-1">{email}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;