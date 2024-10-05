// src/Signup.js
import React from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom'; // For navigation

const Signup = () => {
    const navigate = useNavigate(); // useNavigate hook to redirect

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log('User signed in:', user);
                // Redirect to "/chats" after successful sign-in
                navigate('/chats');
            })
            .catch((error) => {
                console.error('Error during sign in:', error);
            });
    };

    return (
        <div>
            <h1>Sign up with Google</h1>
            <button onClick={googleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default Signup;
