import firebase from 'firebase/app';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from './firebaseConfig';
import "firebase/auth";
import './LoginModal.css';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {
    const { setLoggedInUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    const history = useHistory();
    const { pathname, ...location } = useLocation();
    const { from } = location.state || { from: { pathname: "/" } }

    useEffect(() => pathname === '/login' && setShowModal(true), [pathname]);

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/signedIn',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => handleResponse(authResult)
        }
    }

    const handleResponse = (res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
        }
        setLoggedInUser(signedInUser);
        setShowModal(false);
        history.replace(from);
    }

    return (
        <Modal
            show={showModal}
            onHide={() => {
                setShowModal(false);
                window.history.back();
            }}
            size="md"
            centered>
            <Modal.Header closeButton />
            <Modal.Body>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </Modal.Body>
        </Modal>
    );
};

export default Login;