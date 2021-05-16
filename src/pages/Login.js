import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import LoginModal from '../components/Login/LoginModal';
import infoEmojis from '../images/info-emoji.svg';

const Login = () => {
    const [show, setShow] = useState(true);
    return (
        <section>
            <Toast className="toast-left" onClose={() => setShow(false)} show={show} delay={10000} autohide>
                <Toast.Header>
                    <img src={infoEmojis} className="rounded mr-2" alt="Info" />
                    <strong className="mr-auto">Important Info</strong>
                </Toast.Header>
                <Toast.Body className="text-center">
                    Use this account to <br /> Sign in as an admin to test the admin panel <br /> Or login with a different account as a user.
                </Toast.Body>
            </Toast>
            <LoginModal />
        </section>
    );
};

export default Login;