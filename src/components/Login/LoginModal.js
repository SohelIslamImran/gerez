import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import {
    createUserWithEmailAndPassword,
    handleGoogleSignIn,
    initializeLoginFramework,
    setJWTToken,
    signInWithEmailAndPassword
} from './LoginManager';
import './LoginModal.css';

const Login = () => {
    const { setLoggedInUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const { register: registerSignIn, handleSubmit: handleSignIn } = useForm();
    const { register: registerSignUp, handleSubmit: handleSignUp } = useForm();

    const history = useHistory();
    const { pathname, ...location } = useLocation();
    const { from } = location.state || { from: { pathname: "/" } }

    useEffect(() => pathname === '/login' && setShowModal(true), [pathname]);

    const googleSignIn = () => {
        initializeLoginFramework();
        const loading = toast.loading('Please wait...');
        handleGoogleSignIn()
            .then(res => {
                setLoggedInUser(res);
                toast.dismiss(loading);
                toast.success('Successfully Signed In!');
                setJWTToken();
                setShowModal(false);
                history.replace(from);
            }).catch(err => {
                toast.dismiss(loading);
                toast.error(err.message)
            });
    }

    const onSubmit = data => {
        initializeLoginFramework();
        const loading = toast.loading('Please wait...');
        const { name, email, password } = data;

        if (newUser && name && email && password) {
            createUserWithEmailAndPassword(name, email, password)
                .then(res => {
                    res.name = name;
                    setLoggedInUser(res);
                    setJWTToken();
                    toast.dismiss(loading);
                    toast.success('Successfully Signed Up!');
                    setShowModal(false);
                    history.replace(from);
                }).catch(err => {
                    toast.dismiss(loading);
                    toast.error(err.message)
                });
        }

        if (!newUser && email && password) {
            signInWithEmailAndPassword(email, password)
                .then(res => {
                    setLoggedInUser(res);
                    setJWTToken();
                    toast.dismiss(loading);
                    toast.success('Successfully Signed In!');
                    setShowModal(false);
                    history.replace(from);
                }).catch(err => {
                    toast.dismiss(loading);
                    toast.error(err.message)
                });
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={() => {
                setShowModal(false);
                history.replace({ pathname: "/" });
            }}
            size="lg"
            centered>
            <Modal.Header closeButton />
            <Modal.Body>
                <div className={newUser ? "cont s--signup" : "cont"}>
                    <div className="form sign-in">
                        <h2>Sign in</h2>
                        <form onSubmit={handleSignIn(onSubmit)}>
                            <label>
                                <span>Email</span>
                                <input {...registerSignIn("email", { required: true })} type="email" />
                            </label>
                            <label>
                                <span>Password</span>
                                <input {...registerSignIn("password", { required: true })} type="password" />
                            </label>
                            <p className="forgot-pass">Forgot password?</p>
                            <button type="submit" className="submit">Sign In</button>
                            <button type="button" onClick={googleSignIn} className="fb-btn">Connect with <span>Google</span></button>
                        </form>
                    </div>
                    <div className="sub-cont">
                        <div className="img">
                            <div className="img__text m--up">
                                <h2>New here?</h2>
                                <p>Sign up and discover great amount of new opportunities!</p>
                            </div>
                            <div className="img__text m--in">
                                <h2>One of us?</h2>
                                <p>If you already has an account, just sign in. We've missed you!</p>
                            </div>
                            <div onClick={() => setNewUser(!newUser)} className="img__btn">
                                <span className="m--up">Sign Up</span>
                                <span className="m--in">Sign In</span>
                            </div>
                        </div>
                        <div className="form sign-up">
                            <h2>Create Account</h2>
                            <form onSubmit={handleSignUp(onSubmit)}>
                                <label>
                                    <span>Name</span>
                                    <input {...registerSignUp("name", { required: true })} type="text" />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input {...registerSignUp("email", { required: true })} type="email" />
                                </label>
                                <label>
                                    <span>Password</span>
                                    <input {...registerSignUp("password", { required: true })} type="password" />
                                </label>
                                <button type="submit" className="submit">Sign Up</button>
                                <button type="button" onClick={googleSignIn} className="fb-btn">Join with <span>Google</span></button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;