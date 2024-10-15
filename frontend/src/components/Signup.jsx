import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon } from '../assets/CustomIcons';
import spartanCoveLogo from '../assets/spartan-cove-logo.png';
import auth from '../firebaseconfig'; 
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import axios from 'axios';
import Alert from '@mui/material/Alert';

// Styled components
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

// Helper function to detect mobile devices or Safari browser
const isMobileOrSafari = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /iPhone|iPad|iPod|Android/i.test(userAgent) || (userAgent.includes('Safari') && !userAgent.includes('Chrome'));
};

const registerUser = async (userObj) => {
  const backend_url = "http://localhost:5002";
  const user = userObj.providerData[0];
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(`${backend_url}/users`,
      {
        "uid": userObj.uid,
        "name": user.displayName,
        "phoneNumber": user.phoneNumber,
        "email": user.email,
        "profilePicture": user.photoURL,
      },
      config
    );
    data["token"] = userObj.stsTokenManager.accessToken;
    /* what do we have? */
    // data = {
    //   "_id": "tZfrvuWu9DflMujV2d5XKErGzdB3",
    //   "name": "Rushabh Gautam Runwal",
    //   "phoneNumber": null,
    //   "email": "rushabhgautam.runwal@sjsu.edu",
    //   "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocJ58ejFD0gNkZGzrHn-LZVkpWFrcPDZLjfzINASRW7jWEKTgA=s96-c",
    //   "statusMessage": "Joined my fellow Spartans at the SpartanCove - let the chats begin!",
    //   "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOWJlZmQzZWZmY2JiYzgyYzgzYWQwYzk3MmM4ZWE5NzhmNmYxMzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUnVzaGFiaCBHYXV0YW0gUnVud2FsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0o1OGVqRkQwZ05rWkd6ckhuLUxaVmtwV0ZyY1BEWkxqZnpJTkFTUlc3aldFS1RnQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaGF0LWFwcC0yMjE2ZCIsImF1ZCI6ImNoYXQtYXBwLTIyMTZkIiwiYXV0aF90aW1lIjoxNzI4ODYzNTI4LCJ1c2VyX2lkIjoidFpmcnZ1V3U5RGZsTXVqVjJkNVhLRXJHemRCMyIsInN1YiI6InRaZnJ2dVd1OURmbE11alYyZDVYS0VyR3pkQjMiLCJpYXQiOjE3Mjg4NjM1MjgsImV4cCI6MTcyODg2NzEyOCwiZW1haWwiOiJydXNoYWJoZ2F1dGFtLnJ1bndhbEBzanN1LmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE3NjIzMDc0NzQ5NTQzOTE2NzAzIl0sImVtYWlsIjpbInJ1c2hhYmhnYXV0YW0ucnVud2FsQHNqc3UuZWR1Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.OlkdWUTtXhSyABc20H4dwSIA1a2Npz-IVchWoNI63gacRTvc9OT4P6PDnAcF8COREPLgbp5eOzEyjTsn5I8OblrAWZKasKJLSY1I8BaupGtP8PZgYuh7SOYzfeMUjiciTV50cIsDVdczMPpQW9fEF_2iKBF6vlRR3VbR0laCpoAeL3elzkXux2PIc-14oh3YTVwwglcJop872ed6kpsUVlzm32Dka8oyLJum-Qr-1pQrhQfm_ENuFjDhOGgDnNKe10o6zajCOX3GsXIWeVxeGkhfY0EpsIU_r-xjvxKrmNRvmq6i8Omueqv6rmcB7R7NBSGrXVMJy7YV0xZXQ4WPew"
    // }
    localStorage.setItem("userInfo", JSON.stringify(data));
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default function SignUp(props) {
  const [errorMessage, setErrorMessage] = React.useState(''); // State to manage error messages
  const navigate = useNavigate(); // useNavigate hook to redirect

  
  /* For testing purposes */  
    // const sampleUserObj = {
    //   "uid": "tZfrvuWu9DflMujV2d5XKErGzdB3",
    //   "email": "rushabhgautam.runwal@sjsu.edu",
    //   "emailVerified": true,
    //   "displayName": "Rushabh Gautam Runwal",
    //   "isAnonymous": false,
    //   "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJ58ejFD0gNkZGzrHn-LZVkpWFrcPDZLjfzINASRW7jWEKTgA=s96-c",
    //   "providerData": [
    //       {
    //           "providerId": "google.com",
    //           "uid": "117623074749543916703",
    //           "displayName": "Rushabh Gautam Runwal",
    //           "email": "rushabhgautam.runwal@sjsu.edu",
    //           "phoneNumber": null,
    //           "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJ58ejFD0gNkZGzrHn-LZVkpWFrcPDZLjfzINASRW7jWEKTgA=s96-c"
    //       }
    //   ],
    //   "stsTokenManager": {
    //       "refreshToken": "AMf-vBzXtV-9CYl1od0AXK5VCnXr2gu7fgX_se0tA0Zj2z_u-d6E1kAtkieUU-5XA3NFX029ye77HW5eDRvHVlr89PaucuMVSo56N1jWZ_p5E0jZfavEDfoRm1VDHd9GFIcDzw6FI6iuuHJa2onsl5cdAQi6UKQ-iHrrlKxdpNivLdznRWxlJVqfSgTfP1J0BW39kubw4WnA4oBAeyQMbuelvM5MVXUWh_KU8ZCsezFhH9ljzMeAynfzhcgcos8l-0ugvldI6UVTt2VtlEN8WRruyM_WKPRcENB97fTKDx6vqWhnD28qRTxABE5IYJwUOi5mRvJLDCWpQrpQqPQYsCL1v-OvYYWl-5ZHP5mh8XSXivJF88pkrckBdq0NQ88_Vg8MGjL-t5LVEx2qJp1N_BvHqT9bg0rdaR6Ma9b69QwMA0RNmZU0rMgl3CkLK5mwnKrtoD88YObu",
    //       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOWJlZmQzZWZmY2JiYzgyYzgzYWQwYzk3MmM4ZWE5NzhmNmYxMzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUnVzaGFiaCBHYXV0YW0gUnVud2FsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0o1OGVqRkQwZ05rWkd6ckhuLUxaVmtwV0ZyY1BEWkxqZnpJTkFTUlc3aldFS1RnQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaGF0LWFwcC0yMjE2ZCIsImF1ZCI6ImNoYXQtYXBwLTIyMTZkIiwiYXV0aF90aW1lIjoxNzI4ODYzNTI4LCJ1c2VyX2lkIjoidFpmcnZ1V3U5RGZsTXVqVjJkNVhLRXJHemRCMyIsInN1YiI6InRaZnJ2dVd1OURmbE11alYyZDVYS0VyR3pkQjMiLCJpYXQiOjE3Mjg4NjM1MjgsImV4cCI6MTcyODg2NzEyOCwiZW1haWwiOiJydXNoYWJoZ2F1dGFtLnJ1bndhbEBzanN1LmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE3NjIzMDc0NzQ5NTQzOTE2NzAzIl0sImVtYWlsIjpbInJ1c2hhYmhnYXV0YW0ucnVud2FsQHNqc3UuZWR1Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.OlkdWUTtXhSyABc20H4dwSIA1a2Npz-IVchWoNI63gacRTvc9OT4P6PDnAcF8COREPLgbp5eOzEyjTsn5I8OblrAWZKasKJLSY1I8BaupGtP8PZgYuh7SOYzfeMUjiciTV50cIsDVdczMPpQW9fEF_2iKBF6vlRR3VbR0laCpoAeL3elzkXux2PIc-14oh3YTVwwglcJop872ed6kpsUVlzm32Dka8oyLJum-Qr-1pQrhQfm_ENuFjDhOGgDnNKe10o6zajCOX3GsXIWeVxeGkhfY0EpsIU_r-xjvxKrmNRvmq6i8Omueqv6rmcB7R7NBSGrXVMJy7YV0xZXQ4WPew",
    //       "expirationTime": 1728867128367
    //   },
    //   "createdAt": "1728856097953",
    //   "lastLoginAt": "1728863413299",
    //   "apiKey": "AIzaSyAqIY5Zt0k0lc61z-i9MBCMh-9GLwxBkLo",
    //   "appName": "[DEFAULT]"
    // }
    // const sampleUserObj1 = {
    //   "name": "Rushabh Gautam Runwal",
    //   "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ58ejFD0gNkZGzrHn-LZVkpWFrcPDZLjfzINASRW7jWEKTgA=s96-c",
    //   "iss": "https://securetoken.google.com/chat-app-2216d",
    //   "aud": "chat-app-2216d",
    //   "auth_time": 1728946618,
    //   "user_id": "tZfrvuWu9DflMujV2d5XKErGzdB3",
    //   "sub": "tZfrvuWu9DflMujV2d5XKErGzdB3",
    //   "iat": 1728946618,
    //   "exp": 1728950218,
    //   "email": "rushabhgautam.runwal@sjsu.edu",
    //   "email_verified": true,
    //   "firebase": {
    //     "identities": {
    //       "google.com": [
    //         "117623074749543916703"
    //       ],
    //       "email": [
    //         "rushabhgautam.runwal@sjsu.edu"
    //       ]
    //     },
    //     "sign_in_provider": "google.com"
    //   }
    // }
    // Handle Google sign-in
  const googleSignIn = () => {
    /* For testing purposes */  
      // registerUser(sampleUserObj).then((isUserValid) => {
      //   console.log(isUserValid);
      //   if (isUserValid.success) {
      //       navigate('/chats');
      //   }
      // });
    const provider = new GoogleAuthProvider();
    
    if (isMobileOrSafari()) {
      // Use redirect for mobile or Safari
      signInWithRedirect(auth, provider);
    } else {
      // Use popup for desktop (Chrome, etc.)
      signInWithPopup(auth, provider)
        .then((result) => {
          const email = result.user.email;
          if (email.endsWith('@sjsu.edu')) {
            registerUser(result.user).then((isUserValid) => {
              if (isUserValid.success) {
                navigate('/chats');
              }
            });
          } else {
            setErrorMessage('Only SJSU members are allowed to sign in.');
            auth.signOut();
          }
        })
        .catch((error) => {
          setErrorMessage('Google sign-in failed.');
          console.error('Google sign-in error:', error);
        });
    }
  };

  // Handle the redirect after sign-in on mobile or Safari
  React.useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const email = result.user.email;
          if (email.endsWith('@sjsu.edu')) {
            registerUser(result.user).then((isUserValid) => {
              if (isUserValid.success) {
                navigate('/chats');
              }
            });
          } else {
            setErrorMessage('Only SJSU members are allowed to sign in.');
            auth.signOut();
          }
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('Google sign-in failed.');
          console.error('Google sign-in redirect error:', error);
        }
      });
  }, [navigate]);

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
        direction="column"
        justifyContent="space-between"
      >
        <Card variant="outlined">
          <Box
            component="img"
            sx={{ height: '100%', width: 'auto' }}
            alt="Spartan Cove Logo"
            src={spartanCoveLogo}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={googleSignIn}
              startIcon={<GoogleIcon />}
            >
              Sign in with SJSU mail ID
            </Button>
          </Box>
        </Card>
        {errorMessage && (
          <Alert
            onClose={() => { setErrorMessage(''); }}
            variant="filled"
            severity="error"
          >
            {errorMessage}
          </Alert>
        )}
      </SignInContainer>
    </>
  );
}
