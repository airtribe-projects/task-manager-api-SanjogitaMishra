const express = require('express');
const app = express();
// const port = 3000;

app.use(express.json());

//in memory task storage
let tasks = [
    { id: 1, title: 'Set up environment', 
        description: 'Install Node.js, npm, and git',
        completed: true },
];

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
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
    const { title, description, completed } = req.body;

    if (!title || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        description: description || '',
        completed
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

    const { title, description, completed } = req.body;

    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

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
module.exports = app;