# RAYR_Spartan_Cove
## CMPE-272 Project

# [Video Demo on YouTube](https://youtu.be/HTU1k8cqlZ0)

# SJSU Real-time Chat Application

A feature-rich real-time chat application built exclusively for San Jose State University students using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- Real-time one-to-one chat
- Group chat functionality
- Profile customization
- SJSU-specific AI chatbot
- Secure authentication for SJSU students
- Real-time message notifications
- User presence indicators

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: Socket.io
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/sjsu-chat-app.git
```

2. Install Backend Dependencies
   Navigate to the backend directory:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
   Navigate to the frontend directory:
```bash
cd frontend
npm install
```
## Running the Application

1. Start the Backend Server:
   In the backend directory:
```bash
npm run dev
```

2. Start the Frontend Application:
   In the frontend directory:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000


## Environment Variables

Create a .env file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Project Structure
```
sjsu-chat-app/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── config/
    └── package.json
└── .env
└── README.md
└── .gitignore
```
