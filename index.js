// index.js
// A simple REST API example — Express only, no database (data lives in memory).
// Restarting the server resets the data back to the starting values.

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // allows the frontend (running on a different port) to call this API
app.use(express.json()); // lets us read JSON data sent in request bodies

// In-memory "database" — just a plain array
let tasks = [
  { id: 1, title: 'Learn Express', done: false },
  { id: 2, title: 'Build a REST API', done: false },
];

// ---------- CREATE ----------
// POST /tasks — add a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    done: false,
  };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

// ---------- READ ----------
// GET /tasks — return all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id — return a single task by id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// ---------- UPDATE ----------
// PUT /tasks/:id — update a task's title and/or done status
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;

  res.json(task);
});

// ---------- DELETE ----------
// DELETE /tasks/:id — remove a task
app.delete('/tasks/:id', (req, res) => {
  const exists = tasks.some((t) => t.id === parseInt(req.params.id));
  if (!exists) return res.status(404).json({ error: 'Task not found' });

  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.json({ message: 'Task deleted' });
});

// ---------- Fallback for unknown routes ----------
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});