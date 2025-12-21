<h1 align="center">📝 Node Task Manager</h1>

<p align="center">
  <strong>A Modern REST API Task Management Application</strong>
</p>

<p align="center">
  <em>
    A sleek and responsive task management system built with Node.js and Express, 
    featuring a clean REST API backend and elegant frontend interface.
  </em>
</p>

<div align="center">
  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 📋 About The Project

Node Task Manager is a simple yet powerful task management application that demonstrates REST API principles with a clean, modern interface. The application allows users to perform full CRUD operations on tasks through an intuitive web interface and a well-structured backend API.

---

## 🖼️ Screenshots

### 🏠 Home Page
<p align="center">
  <img width="874" height="715" alt="Home Page" src="https://github.com/user-attachments/assets/a92d28c7-7db0-4010-8961-4d86b15de2d9" />
</p>

### ✏️ Edit Page
<p align="center">
  <img width="860" height="605" alt="Edit Page" src="https://github.com/user-attachments/assets/222c7f49-6ffa-409f-8b01-431dd99e4746" />
</p>

---

## Technology Stack

### Backend
- **Node.js** 
- **Express.js** 

### Frontend
- **HTML5**
- **CSS3** 
- **JavaScript** 

---

### Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| **GET** | `/api/tasks` | Get all tasks | 200 OK |
| **GET** | `/api/tasks/:id` | Get specific task | 200 OK, 404 Not Found |
| **POST** | `/api/tasks` | Create new task | 201 Created, 400 Bad Request |
| **PUT** | `/api/tasks/:id` | Update existing task | 200 OK, 404 Not Found |
| **DELETE** | `/api/tasks/:id` | Delete task | 204 No Content, 404 Not Found |

### Example Requests


```http
// Create a Task:
POST /api/tasks
Content-Type: application/json

{
  "name": "Learn REST APIs"
}

// Update a Task:
PUT /api/tasks/1
Content-Type: application/json

{
  "newName": "Master REST APIs",
  "newCompleted": true
}

```

### Installation

```http
git clone https://github.com/yourusername/node-task-manager.git
cd node-task-manager
cd src
node \app.js

// Available on URL: http://localhost:5000/home/


