import firebase from "firebase/app";
import "firebase/auth";
import jwtDecode from "jwt-decode";
import firebaseConfig from "./firebaseConfig";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
};

const handleResponse = (res) => {
    const { displayName, photoURL, email } = res.user;
    const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email,
        photo: photoURL || "https://i.ibb.co/5GzXkwq/user.png",
    };
    return signedInUser;
};

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => handleResponse(res));
};

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            updateUserName(name);
            return handleResponse(res);
        });
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => handleResponse(res));
};

export const setJWTToken = () => {
    return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
            localStorage.setItem("token", idToken);
        });
};

export const getDecodedUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return {};
    }
    const { name, picture, email } = jwtDecode(token);
    const decodedUser = {
        isSignedIn: true,
        name,
        email,
        photo: picture || "https://i.ibb.co/5GzXkwq/user.png",
    };
    return decodedUser;
};

export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.removeItem("token");
            const signedOutUser = {
                isSignedIn: false,
                userName: "",
                email: "",
                userPhoto: "",
            };
            return signedOutUser;
        })
        .catch((error) => console.log(error.message));
};
