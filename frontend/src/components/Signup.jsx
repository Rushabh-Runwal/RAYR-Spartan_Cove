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
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useChatState } from '../context/chatProvider';
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
    localStorage.setItem("userInfo", JSON.stringify(data));
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default function SignUp(props) {
  const {setUser} = useChatState();
  const [errorMessage, setErrorMessage] = React.useState(''); // State to manage error messages
  const navigate = useNavigate(); // useNavigate hook to redirect

  
  const googleSignIn = () => {

    const provider = new GoogleAuthProvider();
    
      signInWithPopup(auth, provider)
        .then((result) => {
          const email = result.user.email;
          if (email.endsWith('@sjsu.edu')) {
            registerUser(result.user).then((isUserValid) => {
              if (isUserValid.success) {
                setUser(isUserValid.data);
                console.log(isUserValid.data);
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
  };


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
