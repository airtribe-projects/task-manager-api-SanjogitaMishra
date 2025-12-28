const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// in memory task storage
let tasks = [
    { id: 1, title: 'Set up environment', 
        description: 'Install Node.js, npm, and git',
        completed: true,
        priority: 'medium',
        createdAt: new Date().toISOString()
    },
];

const VALID_PRIORITIES = ['low', 'medium', 'high'];

function getNextId() {
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

// GET /tasks - Retrieve all tasks with optional filtering and sorting
app.get('/tasks', (req, res) => {
    let results = [...tasks];

    // filter by completed
    if (req.query.completed !== undefined) {
        const q = req.query.completed;
        if (q !== 'true' && q !== 'false') {
            return res.status(400).json({ error: 'Invalid query for completed; use true or false' });
        }
        const bool = q === 'true';
        results = results.filter(t => t.completed === bool);
    }

    // filter by priority
    if (req.query.priority !== undefined) {
        const p = req.query.priority;
        if (!VALID_PRIORITIES.includes(p)) {
            return res.status(400).json({ error: `Invalid priority; valid values: ${VALID_PRIORITIES.join(',')}` });
        }
        results = results.filter(t => t.priority === p);
    }

    // sort support
    if (req.query.sort) {
        const [field, order = 'desc'] = req.query.sort.split(':');
        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({ error: 'Invalid sort order; use asc or desc' });
        }
        if (field === 'createdAt') {
            results.sort((a, b) => {
                const diff = new Date(a.createdAt) - new Date(b.createdAt);
                return order === 'asc' ? diff : -diff;
            });
        } else {
            return res.status(400).json({ error: 'Invalid sort field; supported: createdAt' });
        }
    }

    res.status(200).json(results);
});

// GET /tasks/:id - Retrieve a specific task by ID  
app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, completed, priority } = req.body;

    // validation
    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }
    if (typeof description !== 'string' || !description.trim()) {
        return res.status(400).json({ error: 'Description is required and must be a non-empty string' });
    }
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed is required and must be a boolean' });
    }
    const pr = priority === undefined ? 'medium' : priority;
    if (!VALID_PRIORITIES.includes(pr)) {
        return res.status(400).json({ error: `Invalid priority; valid values: ${VALID_PRIORITIES.join(',')}` });
    }

    const newTask = {
        id: getNextId(),
        title: title.trim(),
        description: description.trim(),
        completed,
        priority: pr,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description, completed, priority } = req.body;

    if (title !== undefined) {
        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({ error: 'Title must be a non-empty string' });
        }
        task.title = title.trim();
    }
    if (description !== undefined) {
        if (typeof description !== 'string' || !description.trim()) {
            return res.status(400).json({ error: 'Description must be a non-empty string' });
        }
        task.description = description.trim();
    }
    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed must be a boolean' });
        }
        task.completed = completed;
    }
    if (priority !== undefined) {
        if (!VALID_PRIORITIES.includes(priority)) {
            return res.status(400).json({ error: `Invalid priority; valid values: ${VALID_PRIORITIES.join(',')}` });
        }
        task.priority = priority;
    }

    res.status(200).json(task);
});

// DELETE /tasks/:id - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if(index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(200).json({ message: 'Task deleted successfully' });

});

// GET /tasks/priority/:level - Retrieve tasks by priority level
app.get('/tasks/priority/:level', (req, res) => {
    const level = req.params.level;
    if (!VALID_PRIORITIES.includes(level)) {
        return res.status(400).json({ error: `Invalid priority level; valid: ${VALID_PRIORITIES.join(',')}` });
    }
    const results = tasks.filter(t => t.priority === level);
    res.status(200).json(results);
});

module.exports = app;

