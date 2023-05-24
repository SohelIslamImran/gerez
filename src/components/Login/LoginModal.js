import swal from "@sweetalert/with-react";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context";
import {
    createUserWithEmailAndPassword,
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFramework,
    setJWTToken,
    signInWithEmailAndPassword,
} from "./LoginManager";

const Login = () => {
    const { setLoggedInUser } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState(false);

    const { register: registerSignIn, handleSubmit: handleSignIn } = useForm();
    const { register: registerSignUp, handleSubmit: handleSignUp } = useForm();

    const history = null;
    const { pathname, ...location } = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => pathname === "/login" && setShowModal(true), [pathname]);

    const handleResponse = (res) => {
        setLoggedInUser(res);
        setJWTToken();
        setShowModal(false);
        history.replace(from);
        toast.success("Successfully Logged In!");
        if (res.email === "test@admin.com") {
            swal({
                title: "Warning!",
                content: (
                    <p>
                        You have entered the admin panel for testing.
                        <br />
                        <b>Please do not abuse this facility!</b>
                    </p>
                ),
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((ok) => {
                if (!ok) {
                    handleSignOut().then((user) => {
                        setLoggedInUser(user);
                        toast.error("Logged Out!");
                    });
                }
            });
        }
    };

    const googleSignIn = () => {
        initializeLoginFramework();
        const loading = toast.loading("Please wait...");
        handleGoogleSignIn()
            .then((res) => {
                toast.dismiss(loading);
                handleResponse(res);
            })
            .catch((err) => {
                toast.dismiss(loading);
                toast.error(err.message);
            });
    };

    const onSubmit = (data) => {
        initializeLoginFramework();
        const loading = toast.loading("Please wait...");
        const { name, email, password } = data;

        if (newUser && name && email && password) {
            createUserWithEmailAndPassword(name, email, password)
                .then((res) => {
                    res.name = name;
                    toast.dismiss(loading);
                    handleResponse(res);
                })
                .catch((err) => {
                    toast.dismiss(loading);
                    toast.error(err.message);
                });
        }

        if (!newUser && email && password) {
            signInWithEmailAndPassword(email, password)
                .then((res) => {
                    toast.dismiss(loading);
                    handleResponse(res);
                })
                .catch((err) => {
                    toast.dismiss(loading);
                    toast.error(err.message);
                });
        }
    };

    return (
        <Modal
            show={showModal}
            onHide={() => {
                setShowModal(false);
                history.replace({ pathname: "/" });
            }}
            size="lg"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <div className={newUser ? "cont s--signup" : "cont"}>
                    <div className="form sign-in">
                        <h2>Sign in</h2>
                        <form onSubmit={handleSignIn(onSubmit)}>
                            <label htmlFor="email">
                                <span>Email</span>
                                <input
                                    id="email"
                                    defaultValue="test@admin.com"
                                    {...registerSignIn("email", { required: true })}
                                    type="email"
                                />
                            </label>
                            <label htmlFor="password">
                                <span>Password</span>
                                <input
                                    id="password"
                                    defaultValue="123456"
                                    {...registerSignIn("password", { required: true })}
                                    type="password"
                                />
                            </label>
                            <p className="forgot-pass">Forgot password?</p>
                            <button type="submit" className="submit">
                                Sign In
                            </button>
                            <button type="button" onClick={googleSignIn} className="fb-btn">
                                Connect with <span>Google</span>
                            </button>
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
                                <p>
                                    If you already has an account, just sign in. We've missed you!
                                </p>
                            </div>
                            <div onClick={() => setNewUser(!newUser)} className="img__btn">
                                <span className="m--up">Sign Up</span>
                                <span className="m--in">Sign In</span>
                            </div>
                        </div>
                        <div className="form sign-up">
                            <h2>Create Account</h2>
                            <form onSubmit={handleSignUp(onSubmit)}>
                                <label htmlFor="name">
                                    <span>Name</span>
                                    <input
                                        id="name"
                                        {...registerSignUp("name", { required: true })}
                                        type="text"
                                    />
                                </label>
                                <label htmlFor="registerEmail">
                                    <span>Email</span>
                                    <input
                                        id="registerEmail"
                                        {...registerSignUp("email", { required: true })}
                                        type="email"
                                    />
                                </label>
                                <label htmlFor="registerPassword">
                                    <span>Password</span>
                                    <input
                                        id="registerPassword"
                                        {...registerSignUp("password", { required: true })}
                                        type="password"
                                    />
                                </label>
                                <button type="submit" className="submit">
                                    Sign Up
                                </button>
                                <button type="button" onClick={googleSignIn} className="fb-btn">
                                    Join with <span>Google</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
