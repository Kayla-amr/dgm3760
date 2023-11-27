const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

let todo = [
    {
    id: 1,
    name: 'View Training Module',
    category: 'Home',
    date: '2020-03-01',
    status: false

},
{
    id: 2,
    name: 'Read Require Reads',
    category: 'Work',
    date: '2020-12-01',
    status: true
},
{
    id: 3,
    name: 'Complete Assignment',
    category: 'Work',
    date: '2020-01-01',
    status: true
},
{
    id: 4,
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// GET TODOS
app.get('/api/todo', (req, res) => res.send(todo));

// POST TODO
app.post('/api/todo', (req, res) => {

    todo.push({
        id: todo.length + 1,
        name: req.body.name,
        category: req.body.category,
        date: req.body.date,
        status: false
    });
    
    res.send(todo);
    });

// PUT TODO (update)
app.put('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    const index = todo.findIndex(task => task.id == id);
    if (index > -1) {
        todo[index] = updatedTodo;
        res.send(updatedTodo);
    } else {
        res.status(404).send({ error: 'Todo not found' });
    }
});

// DELETE TODO
app.delete('/api/todo/:id', (req, res) => {
    const newTodo = todo.filter(todo => todo.id !== JSON.parse(req.params.id))
    
    if (newTodo.length < todo.length) {
        todo = newTodo
        res.send(todo)
    } 
    else {
        res.status(404).send({ error: 'Todo not found' });
    }
})

// GET ALL TODOS for a CATEGORY
app.get('/api/todo/category', (req, res) => {
    const category = req.params.category;
    const todosForCategory = todo.filter(t => t.category === category);
    res.send(todosForCategory);
});

// GET CATEGORIES
app.get('/api/categories', (req, res) => res.send(categories));

// POST CATEGORIES
app.post('/api/categories', (req, res) => {
    const newCategory = req.body.name;
    categories.push(newCategory);
    res.send(categories);
});

// PUT CATEGORIES (update)
app.put('/api/categories', (req, res) => {
    const oldCategory = req.params.oldCategory;
    const newCategory = req.body.name;
    const index = categories.indexOf(oldCategory);
    if (index > -1) {
        categories[index] = newCategory;
        res.send({ name: newCategory });
    } else {
        res.status(404).send({ error: 'Category not found' });
    }
});

// DELETE CATEGORIES
app.delete('/api/categories', (req, res) => {
    const category = req.params.category;
    categories = categories.filter(subject => subject !== category);
    if (categories.length < oldCategories.length) {
        res.send(categories);
    }
    else {
        res.status(404).send({ error: 'Category not found' });
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
