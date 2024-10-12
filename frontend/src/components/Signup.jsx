// src/Signup.js
import React, { useState } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom'; // For navigation

const Signup = () => {
    const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
    const navigate = useNavigate(); // useNavigate hook to redirect

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const email = user.email;

                // Check if the email ends with '@sjsu.edu'
                if (email.endsWith('@sjsu.edu')) {
                    console.log('User signed in:', user);
                    // Redirect to "/chats" after successful sign-in
                    navigate('/chats');
                } else {
                    setErrorMessage('Only SJSU email addresses are allowed.');
                    console.error('Invalid email domain:', email);
                    // Optionally sign out the user if email is invalid
                    auth.signOut();
                }
            })
            .catch((error) => {
                console.error('Error during sign in:', error);
                setErrorMessage('An error occurred during sign-in. Please try again.');
            });
    };

    return (
        <div>
            <h1>Sign up with Google</h1>
            <button onClick={googleSignIn}>Sign in with Google</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
        </div>
    );
};

export default Signup;
