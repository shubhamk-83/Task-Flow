# TaskFlow — MERN Task Management Application

TaskFlow is a full-stack task management application built with the MERN stack. It allows users to create, organize, update, search, filter, and delete tasks through a clean and responsive dashboard.

This project was developed as part of a MERN Stack technical assignment.

## Features

- Create, edit, and delete tasks.
- Set task priorities: Low, Medium, and High.
- Track task status: Pending and Completed.
- Search tasks by title.
- Filter tasks by status and priority.
- View dashboard statistics.
- Display toast notifications for successful and failed operations.
- Responsive user interface.
- Persist task data in MongoDB Atlas.
- RESTful API architecture.
- Input validation and error handling.

## Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Hot Toast
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- express-validator
- dotenv

### Development Tools
- Kiro AI IDE
- Git
- GitHub

## Project Structure

```text
Task-Flow/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Prerequisites

Before running the application, install:

- Node.js and npm
- A MongoDB Atlas account
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/shubhamk-83/Task-Flow.git
cd Task-Flow
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory using `.env.example` as a reference.

Configure the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

Never commit your actual `.env` file or database credentials to GitHub.

Start the backend:

```bash
npm run dev
```

The backend runs on `http://localhost:5000`.

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

The GET endpoint supports query parameters for searching and filtering tasks by status and priority.

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NODE_ENV` | Application environment |
| `CLIENT_ORIGIN` | Allowed frontend origin |

## AI Development Experience

Kiro was used as an AI-assisted development tool during this project.

The development process involved reviewing AI-generated suggestions, running the application, testing functionality, and troubleshooting configuration issues.

Examples of AI-assisted tasks included:

1. Planning the application architecture and project folder structure.
2. Generating and refining the Express API and MongoDB integration.
3. Developing reusable React components for task management.
4. Troubleshooting the MongoDB connection configuration.
5. Integrating toast notifications and reviewing frontend build output.

AI-generated code was reviewed and tested during development to verify that the application behaved as expected.

## Future Improvements

- User authentication and personal task lists.
- Task due dates and reminders.
- Task sorting and additional filters.
- Deployment with a hosted frontend and backend.

## Author

**Shubham Kumar**

GitHub: https://github.com/shubhamk-83

Portfolio: https://protfolio-2-beryl.vercel.app/