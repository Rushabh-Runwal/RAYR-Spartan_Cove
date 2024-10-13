// // src/Signup.js
// import React, { useState } from 'react';
// import  auth  from '../firebaseconfig';
// import { useNavigate } from 'react-router-dom'; // For navigation
// import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

// const Signup = () => {
//     const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
//     const navigate = useNavigate(); // useNavigate hook to redirect

//     const googleSignIn = () => {
//         const provider = new GoogleAuthProvider();
//         signInWithPopup(auth, provider)
//             .then((result) => {

//                 // Check if the email ends with '@sjsu.edu'
//                 if (email.endsWith('@sjsu.edu')) {
                    
//                     console.log('User signed in:', user);
//                     // Redirect to "/chats" after successful sign-in
//                     navigate('/chats');
//                 } else {
//                     setErrorMessage('Only SJSU email addresses are allowed.');
//                     console.error('Invalid email domain:', email);
//                     // Optionally sign out the user if email is invalid
//                     auth.signOut();
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error during sign in:', error);
//                 setErrorMessage('An error occurred during sign-in. Please try again.');
//             });
//     };

//     return (
//         <div>
//             <h1>Sign up with Google</h1>
//             <button onClick={googleSignIn}>Sign in with Google</button>
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
//         </div>
//     );
// };

// export default Signup;
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, SpartanCoveIcon } from '../assets/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {


  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer 
      //set container in center of the page
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}

      direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SpartanCoveIcon />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </Box>
        </Card>
      </SignInContainer>
      </>
  );
}
