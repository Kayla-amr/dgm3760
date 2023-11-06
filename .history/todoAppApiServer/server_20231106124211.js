const express = require('express');
const app = express();
const port = 3000;

let todo = [
    {
    id: 0,
    name: 'View Training Module',
    category: 'Home',
    date: '2020-03-01',
    status: false

},
{
    id: 1,
    name: 'Read Require Reads',
    category: 'Work',
    date: '2020-12-01',
    status: true
},
{
    id: 2,
    name: 'Complete Assignment',
    category: 'Work',
    date: '2020-01-01',
    status: true
},
{
    id: 3,
    name: 'Submit Assignment',
    category: 'School',
    date: '2020-05-01',
    status: false
},
];

let categories = [
    'Home', 
    'Work', 
    'School'
];

// GET TODOS
app.get('/todo', (req, res) => res.json(todo));

// POST TODO
app.post('/todo', (req, res) => {
    let addTodo = req.body;
    todo.push(addTodo);
    res.json(addTodo);
});

// PUT TODO (update)
app.put('/todo/:id', (req, res) => {
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
app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    todo = todo.filter(todoItem => todoItem.id != id);
    res.json({ success: true });
});

// GET ALL TODOS CATEGORY
app.get('/todo/category/:category', (req, res) => {
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
    categories = categories.filter(subject => subject !== category);
    res.json({ success: true });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
