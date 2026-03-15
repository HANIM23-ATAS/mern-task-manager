# mern-task-manager
<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

# 📋 MERN Task Manager

A modern, full-stack **Task Management** application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). Organize your workflow with a beautiful Kanban board, track subtasks, set priorities, and never miss a deadline.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Kanban Board** | Drag tasks across **To Do**, **In Progress**, and **Done** columns |
| ➕ **Task Creation** | Create tasks with title, description, priority, tags, due date & subtasks |
| 🏷️ **Priority Levels** | 4 priority levels — `Urgent`, `High`, `Medium`, `Low` with color-coded badges |
| 🔖 **Tags** | Add custom tags to categorize and organize your tasks |
| 📅 **Due Dates** | Set deadlines with automatic overdue detection & warnings |
| ✅ **Subtasks** | Break tasks into smaller subtasks and track completion progress |
| 🔍 **Search & Filter** | Quickly find tasks by title or filter by criteria |
| 🗑️ **Quick Actions** | Delete tasks or move them between columns with one click |
| 🌙 **Dark Theme** | Beautiful dark-themed UI for comfortable viewing |
| 📱 **Responsive** | Fully responsive design that works on all screen sizes |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — UI library
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first CSS framework
- **Lucide React** — Beautiful icon library
- **React Hot Toast** — Elegant notifications
- **date-fns** — Date utility library

### Backend
- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — ODM for MongoDB

---

## 📁 Project Structure

```
mern-task-manager/
├── backend/
│   ├── controllers/
│   │   └── taskController.js    # CRUD logic
│   ├── models/
│   │   └── Task.js              # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js        # API routes
│   ├── .env                     # Environment variables
│   ├── server.js                # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── TaskCard.jsx     # Individual task card
│   │   │   ├── TaskColumn.jsx   # Kanban column
│   │   │   └── TaskModal.jsx    # Task create/edit modal
│   │   ├── api.js               # Axios API config
│   │   ├── App.jsx              # Root component
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/HANIM23-ATAS/mern-task-manager.git
cd mern-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
```

Start the backend server:

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/:id` | Get a single task |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Example Request Body

```json
{
  "title": "Design the homepage",
  "description": "Create the main landing page design",
  "status": "todo",
  "priority": "high",
  "tags": ["design", "frontend"],
  "dueDate": "2026-04-01",
  "subtasks": [
    { "title": "Create wireframe", "isCompleted": false },
    { "title": "Design mockup", "isCompleted": false }
  ]
}
```

---

## 📸 Screenshots

> _Screenshots will be added soon._

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

---

<p align="center">
  Made with ❤️ using MERN Stack
</p>
