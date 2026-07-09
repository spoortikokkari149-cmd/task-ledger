# 📋 Task Ledger

Task Ledger is a simple and efficient task management application that helps users organize, track, and manage their daily tasks. It provides an easy-to-use interface for creating, updating, deleting, and monitoring tasks.

## 🚀 Features

- Add new tasks
- View all tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed
- Track task status
- Responsive and user-friendly interface
- Data stored using SQLite database

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Node.js
- Express.js
- SQLite
- better-sqlite3
- CORS

## 📁 Project Structure

```
Task-Ledger/
│
├── backend/
│   ├── index.js
│   ├── data.db
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
cd Task-Ledger
```

### Backend Setup

```bash
cd backend
npm install
node index.js
```

The backend server starts on:

```
http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Fetch all tasks |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## 📌 Database

SQLite database (`data.db`) is used to store task information.

Example table:

| Column | Type |
|---------|------|
| id | INTEGER PRIMARY KEY |
| title | TEXT |
| description | TEXT |
| status | TEXT |
| created_at | TEXT |

## 🎯 Future Enhancements

- User authentication
- Task categories
- Due dates and reminders
- Search and filter tasks
- Dark mode
- Priority levels
- Drag-and-drop task organization

## 👨‍💻 Author

Developed as a Full Stack Task Management Project using React, Node.js, Express, and SQLite.

## 📄 License

This project is developed for educational and learning purposes.
