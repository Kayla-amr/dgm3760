const express = require('express');
const app = express();
const port = 3000;

let todo = [ ... ]; // your previous todo list here
let categories = ['Home', 'Work', 'School'];

app.use(express.json());

// GET TODOS
app.get('/todos', (req, res) => res.json(todo));

// POST TODO
app.post('/todos', (req, res) => {
    let newTodo = req.body;
    todo.push(newTodo);
    res.json(newTodo);
});

// PUT TODO (update)
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    const index = todo.findIndex(t => t.id == id);
    if (index > -1) {
        todo[index] = updatedTodo;
        res.json(updatedTodo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// DELETE TODO
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    todo = todo.filter(t => t.id != id);
    res.json({ success: true });
});

// GET ALL TODOS for a CATEGORY
app.get('/todos/category/:category', (req, res) => {
    const category = req.params.category;
    const todosForCategory = todo.filter(t => t.category === category);
    res.json(todosForCategory);
});

// GET CATEGORIES
app.get('/categories', (req, res) => res.json(categories));

// POST CATEGORIES
app.post('/categories', (req, res) => {
    const newCategory = req.body.name;
    categories.push(newCategory);
    res.json({ name: newCategory });
});

// PUT CATEGORIES (update)
app.put('/categories/:oldCategory', (req, res) => {
    const oldCategory = req.params.oldCategory;
    const newCategory = req.body.name;
    const index = categories.indexOf(oldCategory);
    if (index > -1) {
        categories[index] = newCategory;
        res.json({ name: newCategory });
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
});

// DELETE CATEGORIES
app.delete('/categories/:category', (req, res) => {
    const category = req.params.category;
    categories = categories.filter(c => c !== category);
    res.json({ success: true });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
