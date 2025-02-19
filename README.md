# Group Chat Application

This is a **Group Chat Application** built using **Express.js**, **MongoDB** for the backend and **React** for the frontend. The application allows Admin to create groups (public, Private), and user can engage in real-time group messaging. Only admins can manage groups, approve join requests, and access analytics.

## Features

### Backend
- User Authentication (Registration, Login, JWT-based Authorization)
- Group Management (Admins can create groups)
- Member Management (accept/reject join requests)
- Messaging (Send and receive messages in real-time)
- Admin Analytics (View user activity and group statistics)
- Role Management (Admins vs. Regular Members)

### Frontend
- User-friendly UI for group creation, messaging, and invitations
- Secure Login and Registration Pages
- Admin Dashboard for Analytics and Member Management

## Tech Stack

### Backend
- **Node.js** (Runtime Environment)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JWT** (Authentication)

### Frontend
- **React** (UI Library)
- **React Router** (Client-side Routing)
- **Material UI** (Styling Framework)

## Installation

### Prerequisites
Ensure you have the following installed:

- Node.js (>= 18.x)
- MongoDB (>= 6.x)

### Clone the Repository
```bash
  git clone https://github.com/your-repo/group-chat-app.git
  cd group-chat-app
```

### Backend Setup
```bash
  cd backend
  npm install --force
  npm run dev
```

Environment Variables (backend/.env):
```
PORT =5000
JWT_ACCESS_SECRET =
JWT_REFRESH_SECRET =
MONGODB_URI =
```

### Frontend Setup
```bash
  cd frontend
  npm install --force
  npm run dev
```

Environment Variables (frontend/.env):
```
VITE_API_URL=http://localhost:5000
```


### Backend
- `npm run dev` – Start backend in development mode
- `npm run build` – Build for production

### Frontend
- `npm run dev` – Start frontend in development mode
- `npm run build` – Build for production

