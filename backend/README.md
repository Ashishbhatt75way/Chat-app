# Backend API - Group Chat Application

## 📌 Project Overview
This is the backend service for the Group Chat Application, providing APIs for user authentication, group management, and real-time messaging. Built with **Node.js**, **Express**, and **MongoDB**, it follows a modular architecture with separate layers for routes, controllers, and services.

## 🚀 Features
- **User Authentication** (JWT-based login & registration)
- **Group Management** (Create, Join)
- **Messaging** (Send & Retrieve Messages in Groups)
- **Role-based Access Control** (Admin & User Permissions)
- **Database Integration** (MongoDB with Mongoose ORM)
- **Error Handling & Validations**

---

## 🏗 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time Communication**: WebSockets (Future Implementation)
- **Validation**: Express-validator

---

## 📂 Project Structure
```plaintext
backend/
│── src/
│   ├── controllers/        # Business logic for each route
│   ├── models/             # Mongoose schemas & models
│   ├── routes/             # Express routes
│   ├── services/           # Reusable service functions
│   ├── middlewares/        # Authentication & error handling
│   ├── config/             # Environment variables & DB connection
│── .env                    # Environment variables
│── package.json            # Dependencies & scripts
│── README.md               # Project documentation
```

---

## 🛠 Installation & Setup
### 1️⃣ Prerequisites
- **Node.js** v16+
- **MongoDB** (local or cloud instance)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/group-chat-backend.git
cd backend
```

### 3️⃣ Install Dependencies
```sh
npm install --legacy-peer-deps
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT = 8000
JWT_ACCESS_SECRET = "TOP_SECRET"
JWT_REFRESH_SECRET = "TOP_SECRET"
MONGODB_URI = "mongodb://localhost:27017/test_db"
```


## Scripts
- `npm run local`: Start the server with nodemon for development.
- `npm start`: Start the server in local mode using ts-node.
- `npm run dev`: Build the project and run the server in development mode.
- `npm run prod`: Build the project and run the server in production mode.
- `npm run build`: Compile TypeScript to JavaScript in the `dist` folder.
- `npm run lint`: Run ESLint to find code issues.
- `npm run lint:fix`: Automatically fix linting issues.
- `npm run format`: Format code using Prettier.
- `npm run format:check`: Check code formatting with Prettier.

---
