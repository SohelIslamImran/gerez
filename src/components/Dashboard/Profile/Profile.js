import React, { useContext } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { UserContext } from '../../../App';
import { handleSignOut, initializeLoginFramework } from '../../Login/LoginManager';

const Profile = () => {
    const { loggedInUser: { name, email, photo }, setLoggedInUser } = useContext(UserContext);

    const signOut = () => {
        initializeLoginFramework();
        handleSignOut()
            .then(res => {
                setLoggedInUser(res)
                toast.error('Logged Out!');
            })
    }

    return (
        <Container style={{ maxWidth: "30rem" }}>
            <Card className="border-0 shadow">
                <Card.Header as={"h4"} className="text-center border-0 mt-1">Profile</Card.Header>
                <Card.Body className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        <img src={photo} alt="Admin" className="rounded-circle" width="150" />
                        <div className="mt-3">
                            <h4>{name}</h4>
                            <p className="text-secondary mb-1">{email}</p>
                        </div>
                        <Button onClick={signOut} className="px-4 logout-btn btn-main">Logout</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;