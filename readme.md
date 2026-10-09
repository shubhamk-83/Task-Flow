# TaskFlow – MERN Task Management Application

TaskFlow is a full-stack task management application built using the MERN stack. It helps users organize tasks, manage priorities, track progress, and view task statistics through a simple and responsive dashboard.

I built this project as part of the StartupMeu MERN Stack Development Task, using Kiro AI to assist with development and debugging.

## Live Demo

- Frontend: https://task-flow-eight-gilt.vercel.app/
- Backend API: https://task-flow-2-s3ph.onrender.com/api/tasks
- GitHub Repository: https://github.com/shubhamk-83/Task-Flow

## Features

- Create, view, edit, and delete tasks.
- Mark tasks as pending or completed.
- Set task priorities to low, medium, or high.
- Search tasks by keyword.
- Filter tasks by status and priority.
- View dashboard statistics for total, pending, completed, and priority-wise tasks.
- Receive toast notifications for task operations.
- Store tasks in MongoDB so they remain available after refreshing the page.
- Use the application on desktop and mobile screens.
- Handle API validation and errors.

## Technologies Used

Frontend:
- React.js
- Vite
- Tailwind CSS
- Axios
- React Hot Toast

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Express Validator
- dotenv

Tools and Deployment:
- Kiro AI
- Git and GitHub
- Vercel for frontend deployment
- Render for backend deployment

## Project Structure

```text
Task-Flow/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js
│   │   ├── components/
│   │   │   ├── StatsBar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── readme.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Git
- A MongoDB Atlas account or a local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/shubhamk-83/Task-Flow.git
cd Task-Flow
```

### 2. Set Up the Backend

Open a terminal and run:

```bash
cd server
npm install
```

Create a `.env` file inside the server directory and add:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
```

Replace `your_mongodb_connection_string` with your own MongoDB connection string.

Start the backend:

```bash
npm start
```

The backend should run at `http://localhost:5000`.

### 3. Set Up the Frontend

Open another terminal from the project root and run:

```bash
cd client
npm install
```

Create a `.env` file inside the client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## API Endpoints

The base API path is `/api/tasks`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get tasks and dashboard statistics |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Tasks support the following properties:

- `title`: Task title
- `description`: Task description
- `status`: Pending or completed
- `priority`: Low, medium, or high

The API also supports searching and filtering tasks through query parameters.

Example:

```text
/api/tasks?status=pending&priority=high
```

## AI Development Tool

I used Kiro AI during the development of TaskFlow.

### AI Development Experience

Kiro helped me during different stages of development, including component creation, API implementation, database integration, and debugging.

I used it to speed up development and work through implementation issues. I also ran the application, tested its features, and checked the generated code to make sure the application worked as expected.

This experience helped me understand how AI development tools can assist with building applications while still requiring developers to review code, understand the implementation, and fix problems when they occur.

### Tasks Where I Used Kiro

1. Application structure: Used Kiro to help organize the frontend and backend into separate directories and maintain a clear project structure.

2. React components: Used Kiro to assist with creating reusable components for task cards, forms, filters, and dashboard statistics.

3. REST API development: Used Kiro to assist with implementing Express routes and controller logic for creating, retrieving, updating, and deleting tasks.

4. Database integration and debugging: Used Kiro to help with MongoDB and Mongoose integration and investigate database connection issues.

5. UI improvements and deployment: Used Kiro to assist with notification handling, production configuration, API connectivity, and troubleshooting deployment issues.

## Future Improvements

- Add user authentication and individual task management.
- Introduce task deadlines and reminders.
- Add pagination for larger task lists.
- Improve dashboard analytics.
- Add automated tests for frontend components and backend APIs.

## Author

Shubham Kumar

GitHub: https://github.com/shubhamk-83
linkdin:https://www.linkedin.com/in/shubham-kumar-31354836b/
Portfolio: https://protfolio-2-beryl.vercel.app/
Gmail:shubhamrajput5641@gmail.com

---

Built with React, Node.js, Express.js, MongoDB, and assistance from Kiro AI.
