# Task Manager Backend

A simple Node.js + Express backend for managing user accounts and tasks, using PostgreSQL and Sequelize ORM.

---

## Features

- User registration and login with JWT authentication
- Create, read, update, delete (CRUD) tasks
- Search/filter tasks by status and title
- PostgreSQL database support (local or cloud, e.g., Render.com)
- Secure password hashing with bcrypt

---

## Entity Relationship Diagram

![ER Diagram](https://github.com/sarthaks225/task-manager-backend/blob/main/assets/readme/ER_Diagram.png?raw=true)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_NAME=your_db_name
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
JWT_SECRET=your_jwt_secret
PORT=8000
```

> For Render.com or other cloud databases, use their connection details and keep `DB_HOST` containing `render.com` to enable SSL automatically.

### 4. Start the Server

```bash
npm start
```

---

## API Endpoints

### Authentication

#### Register (Signup)

**POST** `/api/signup`

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Curl Example:**

```bash
curl --location 'http://localhost:8000/api/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}'
```

#### Login

**POST** `/api/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Curl Example:**

```bash
curl --location 'http://localhost:8000/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "john@example.com",
  "password": "yourpassword"
}'
```

**Response:**

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

---

### Task Management

> All task endpoints require the `Authorization` header:  
> `Authorization: Bearer JWT_TOKEN`

#### Get All Tasks

**GET** `/api/tasks`

**Curl Example:**

```bash
curl --location --request GET 'http://localhost:8000/api/tasks' \
--header 'Authorization: Bearer JWT_TOKEN'
```

#### Create Task

**POST** `/api/tasks`

**Request Body:**

```json
{
  "title": "Finish project"
}
```

**Curl Example:**

```bash
curl --location --request POST 'http://localhost:8000/api/tasks' \
--header 'Authorization: Bearer JWT_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "title": "Finish project"
}'
```

#### Update Task

**PUT** `/api/tasks/:id`

**Request Body:**

```json
{
  "status": "Done",
  "title": "Finish project (updated)"
}
```

**Curl Example:**

```bash
curl --location --request PUT 'http://localhost:8000/api/tasks/1' \
--header 'Authorization: Bearer JWT_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "status": "Done",
  "title": "Finish project (updated)"
}'
```

#### Delete Task

**DELETE** `/api/tasks/:id`

**Curl Example:**

```bash
curl --location --request DELETE 'http://localhost:8000/api/tasks/1' \
--header 'Authorization: Bearer JWT_TOKEN'
```

#### Search/Filter Tasks

**GET** `/api/tasks/search?status=Done&title=project`

- `status` (optional): "To Do", "In Progress", "Done"
- `title` (optional): partial match

**Curl Example:**

```bash
curl --location --request GET 'http://localhost:8000/api/tasks/search?status=Done&title=project' \
--header 'Authorization: Bearer JWT_TOKEN'
```

---

## Code Structure

- `server.js` - Entry point, sets up Express, routes, and DB connection.
- `models/` - Sequelize models for User and Task.
- `controllers/` - Business logic for authentication and tasks.
- `routes/` - Express route definitions.
- `middleware/` - Authentication middleware for JWT verification.

---

## Notes

- For cloud databases (like Render.com), SSL is enabled automatically if `DB_HOST` contains `render.com`.
- For local development, SSL is disabled.
- Passwords are securely hashed using bcrypt.
- JWT is used for authentication; include the token in the `Authorization` header for protected routes.

---
