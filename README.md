# Hotel Room Booking Website

Full-stack hotel booking app: **React (Vite)** frontend, **Spring Boot 3 / Java 21** backend, **MySQL** database.

> Status: Phase 1 (project setup). Later phases add the database schema, authentication, hotels/rooms, booking logic, the customer pages and the admin dashboard. The full README (API reference, testing, deployment, troubleshooting) is completed in the final phase.

## Project structure

```
hotel-room-booking/
├── backend/    Spring Boot REST API (Maven)
├── frontend/   React + Vite single-page app
├── database/   SQL scripts (create-database.sql now; schema + sample data in Phase 2)
├── .gitignore
└── README.md
```

## Architecture

```
Browser (React, :5173) --HTTP/JSON--> Spring Boot API (:8080) --JDBC--> MySQL (:3306)
```

Backend layers: `controller` (HTTP) -> `service` (business rules) -> `repository` (database), with `dto` classes controlling request/response JSON, `security` for JWT, and `exception` for centralized error handling.

## Quick start (Windows)

Prerequisites: Java 21, Node.js 20+, Maven 3.9+, MySQL 8.

1. Create the database (Command Prompt, from the project root; edit the password inside the file first):
   `mysql -u root -p < database\create-database.sql`
2. Backend (terminal 1, inside `backend`): copy `.env.example` to `.env`, fill in your values, then run `mvn spring-boot:run`
3. Frontend (terminal 2, inside `frontend`): copy `.env.example` to `.env`, then `npm install` and `npm run dev`
4. Open http://localhost:5173 and look for the green "Backend is UP" message.
