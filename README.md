# Task Manager API

Brief
In this guided project, you'll build a RESTful API for managing tasks using Node.js and Express with in-memory storage. Implement CRUD operations, validation, and error handling. Test the API with Postman or curl.

Features
- Create, read, update, and delete tasks
- Basic input validation and error responses
- In-memory data storage (no DB required)

Prerequisites
- Node.js (v12+)
- npm

Setup
1. Clone the repository:
   git clone https://github.com/airtribe-projects/task-manager-api-SanjogitaMishra.git

2. Install dependencies:
   npm install

3. Run automated tests:
   npm run test

Note:
This project exports an Express app from `app.js` for automated testing.
For manual testing with Postman or curl, a temporary server file can be created
to call `app.listen()`. Automated tests are used for final verification.

API Endpoints

Base URL (when running locally, adjust port as needed): http://localhost:3000


1) GET /tasks
- Description: Retrieve all tasks
- Example:
  curl -sS http://localhost:3000/tasks

2) GET /tasks/:id
- Description: Retrieve a task by ID
- Example:
  curl -sS http://localhost:3000/tasks/1

3) POST /tasks
- Description: Create a new task
- Required body: JSON { "title": string, "completed": boolean }
- Optional: "description": string
- Example:
  curl -sS -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"New Task","description":"Details","completed":false}'

4) PUT /tasks/:id
- Description: Update task fields (title, description, completed)
- Example:
  curl -sS -X PUT http://localhost:3000/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"completed":true}'

5) DELETE /tasks/:id
- Description: Delete a task by ID
- Example:
  curl -sS -X DELETE http://localhost:3000/tasks/1

Behavior & Validation
- POST requires "title" and "completed" (boolean).
- PUT validates "completed" if provided (must be boolean).
- Uses in-memory array for storage; restart clears data.

Suggestions / Next steps
- Add persistent storage (MongoDB, SQLite).
- Add request logging, tests, and environment-based configuration (PORT).
- Add pagination and filtering for large task lists.

License
Add your preferred license file (e.g., MIT) if needed.
