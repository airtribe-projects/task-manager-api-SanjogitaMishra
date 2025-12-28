# Task Manager API (Guided Project)

Brief
In this guided project you build a RESTful Task Manager API using Node.js and Express with in-memory storage. The API supports CRUD operations, input validation, filtering, sorting, and a priority attribute.

Prerequisites
- Node.js (v12+)
- npm

Setup
1. Clone the repo:
   git clone <your-repo-url>

2. Install dependencies:
   npm install

3. Run the API for manual testing:
   node server.js

4. Run automated tests (if applicable):
   npm run test

Note:
The project exports an Express app from `app.js`. This design supports automated
testing. For manual testing with Postman or curl, use `server.js` to start the server.

Task schema example
{
  "id": 2,
  "title": "Create a new project",
  "description": "Create a new project using Magic",
  "completed": false,
  "priority": "medium",
  "createdAt": "2025-01-01T12:00:00.000Z"
}

API Base URL
http://localhost:3000

Endpoints

GET /tasks
- Retrieve all tasks.
- Optional query parameters:
  - completed=true|false
  - priority=low|medium|high
  - sort=createdAt or createdAt:asc|createdAt:desc
- Example:
  curl -sS "http://localhost:3000/tasks?completed=false&sort=createdAt:desc"

GET /tasks/:id
- Retrieve task by ID.
- Example:
  curl -sS http://localhost:3000/tasks/1

POST /tasks
- Create a new task. Required body fields: title (non-empty string), description (non-empty string), completed (boolean). Optional: priority (low|medium|high, defaults to medium).
- Example:
  curl -sS -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"New Task","description":"Details","completed":false,"priority":"high"}'

PUT /tasks/:id
- Update an existing task. Validates fields if provided.
- Example:
  curl -sS -X PUT http://localhost:3000/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"completed":true,"priority":"low"}'

DELETE /tasks/:id
- Delete a task by ID.
- Example:
  curl -sS -X DELETE http://localhost:3000/tasks/1

GET /tasks/priority/:level
- Retrieve tasks by priority level (low, medium, high).
- Example:
  curl -sS http://localhost:3000/tasks/priority/high

Validation & Errors
- 400 Bad Request for invalid input (missing/empty title or description, completed not boolean, invalid priority, invalid query params).
- 404 Not Found when a task ID does not exist.

Notes & Next Steps
- Data is stored in-memory; restarting the server clears tasks.
- Suggested improvements: add persistent DB (MongoDB/SQLite), request logging, tests, pagination.

License
Add a license file as needed.
