// src/App.js

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Signup from './components/Signup';
import ChatPage from './components/ChatPage';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1d21',
      paper: '#222529',
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/chats",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </ThemeProvider>
    );
}

export default App;