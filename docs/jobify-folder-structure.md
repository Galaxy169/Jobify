# Jobify Backend Folder Structure

This document explains the structure and purpose of each folder and file in the **Jobify Backend** project.

---

## Root Directory

```
jobify-backend/
```

This is the main backend project folder built using **Node.js, Express, and MySQL**.

---

## config/

```
config/
└── db.js
```

- Contains configuration-related files.
- `db.js` → Responsible for connecting the application to the MySQL database.
- Keeps database logic separate from the main server code.

---

## controllers/

```
controllers/
└── authController.js
```

- Contains the business logic of the application.
- `authController.js` → Handles authentication logic like:
  - User registration
  - User login
  - Sending responses back to client

Controllers act as a bridge between routes and models.

---

## middleware/

```
middleware/
└── authMiddleware.js
```

- Stores custom middleware functions.
- `authMiddleware.js` → Used for:
  - Protecting routes
  - Verifying JWT tokens
  - Allowing only authenticated users

Middleware runs before the final request handler.

---

## models/

```
models/
└── userModel.js
```

- Defines database schemas using.
- `userModel.js` → Represents user data structure:
  - Name
  - Email
  - Password

Models interact directly with the database.

---

## routes/

```
routes/
└── authRoutes.js
```

- Defines API endpoints.
- `authRoutes.js` → Handles routes like:
  - `/api/auth/register`
  - `/api/auth/login`

Routes connect URLs to controller functions.

---

## .env

- Stores environment variables such as:
  - Database URL
  - JWT secret
  - Port number

This file should not be pushed to GitHub.

---

## 📄 server.js

- Entry point of the backend application.
- Responsibilities:
  - Initialize Express app
  - Connect to database
  - Use middleware
  - Register routes
  - Start server

---

## package.json

- Contains project metadata and dependencies.
- Includes:
  - Installed packages (Express, cors, etc.)
  - Scripts like `start` and `dev`

---

## Flow of Request

1. Client sends request → Route
2. Route calls → Controller
3. Controller interacts with → Model
4. Middleware runs before controller
5. Response sent back to client

---

## Summary

- **config/** → Setup (DB connection)
- **controllers/** → Logic
- **middleware/** → Request filtering
- **models/** → Database schema
- **routes/** → API endpoints
- **server.js** → App entry point

---
