const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));


let todo = [
    {
    id: 1,
    name: 'New View Training Module',
    category: 'New Home',
    date: '2020-01-01',
    status: false

},
{
    id: 2,
    name: 'New Read Require Reads',
    category: 'New Work',
    date: '2020-02-01',
    status: true
},
{
    id: 3,
    name: 'New Complete Assignment',
    category: 'New Work',
    date: '2020-03-01',
    status: true
},
{
    id: 4,
    name: 'New Submit Assignment',
    category: 'New School',
    date: '2020-04-01',
    status: false
},
];

let categories = [
    {
        id: 1,
        name: 'New Home'
    },
    {
        id: 2,
        name: 'New Work'
    },
    {
        id: 3,
        name: 'New School'
    }
];


// GET TODOS
app.get('/api/todo', (req, res) => res.send(todo));

// POST TODO
app.post('/api/todo', (req, res) => {
 
    console.log(req.body);
    
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
app.put('/api/todo/status', (req, res) => {
    const { status, id } = req.body; // Destructure for clarity

    const todoIndex = todo.findIndex(item => item.id === id); // Find the index of the item

    if (todoIndex !== -1) {
        todo[todoIndex].status = status; // Update the status
        res.send(todo);
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
    categories.push({
        id: categories.length + 1,
        name: req.body.name,
    });
    res.send(categories);
});

// PUT CATEGORIES (update)
app.put('/api/categories', (req, res) => {
    const { name, oldName } = req.body; // Destructure for clarity

    const categoryIndex = categories.findIndex(item => item === oldName); // Find the index of the item

    if (categoryIndex !== -1) {
        categories[categoryIndex] = name; // Update the status
        res.send(categories);
    } else {
        res.status(404).send({ error: 'Category not found' });
    }
});

// DELETE CATEGORIES
app.delete('/api/categories/:name', (req, res) => {
    const newCategories = categories.filter(category => category !== req.params.name)
    
    if (newCategories.length < categories.length) {
        categories = newCategories
        res.send(categories)
    } 
    else {
        res.status(404).send({ error: 'Category not found' });
    }
})



app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
