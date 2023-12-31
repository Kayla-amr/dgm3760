// let todo = [
//     {
//     id: 0,
//     name: 'View Training Module',
//     category: 'Home',
//     date: '2020-03-01',
//     status: false

// },
// {
//     id: 1,
//     name: 'Read Require Reads',
//     category: 'Work',
//     date: '2020-12-01',
//     status: true
// },
// {
//     id: 2,
//     name: 'Complete Assignment',
//     category: 'Work',
//     date: '2020-01-01',
//     status: true
// },
// {
//     id: 3,
//     name: 'Submit Assignment',
//     category: 'School',
//     date: '2020-05-01',
//     status: false
// },
// ];

// let categories = [
//     'Home', 
//     'Work', 
//     'School'
// ];

document.querySelector('.app > h1').innerText = 'To Do List 2023';

let list = document.querySelector('.list');
let completed = document.querySelector('.completed');

let todo = []; 
let categories = [];

async function getData() {
    let todosPromise = fetch('/api/todo');
    let categoriesPromise = fetch('/api/categories');

    Promise.all([todosPromise, categoriesPromise])
        .then(responses => {
            return Promise.all(responses.map(response => {
                return response.json();
            }));
        })
        .then(data => {
            todo = data[0];
            categories = data[1];
            taskView(todo);
            countTasks(todo);
            populateCategoryDropdowns(categories);
        }
    );
}

    getData();

function populateCategoryDropdowns(categories) {
    const dropdowns = document.querySelectorAll('.categorySelected');
    dropdowns.forEach(dropdown => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.innerText = category.name;
            dropdown.appendChild(option);
        });
    });
}


/*CREATING ELEMENTS*/


//CREATE LIST ITEM FUNCTION
function createListItem(todoItem) {
    let li = document.createElement('li'); //CREATE LIST ITEM
    li.setAttribute('id', todoItem.id);    //SET LIST ITEM ID
    li.innerText = todoItem.category + ' ' + todoItem.date +   ' ' +todoItem.name; //SET LIST ITEM TEXT
    return li;
}

//CREATE DELETE BUTTON FUNCTION
function createDeleteButton(li) {
    let deleteBtn = document.createElement('button');//CREATE DELETE BUTTON
    deleteBtn.setAttribute('id', 'delete');          //SET DELETE BUTTON ID
    deleteBtn.innerText = 'X';                       //SET DELETE BUTTON TEXT
    deleteBtn.addEventListener('click', () =>{  //ADD EVENT LISTENER TO DELETE BUTTON
        deleteTask(li);     
    });
    return deleteBtn;
}

//CREATE STATUS INPUT FUNCTION
function createStatusInput(todoItem) { 
    let status = document.createElement('input');  //CREATE STATUS INPUT
    status.setAttribute('type', 'checkbox');       //SET STATUS INPUT TYPE
    status.setAttribute('id', 'status');           //SET STATUS INPUT ID
    status.setAttribute('value', todoItem.status); //SET STATUS INPUT VALUE
    status.checked = todoItem.status;              //SET STATUS INPUT CHECKED
    status.addEventListener('click', () =>{
        toggleStatus(status, todoItem);            //CALLS TOGGLE STATUS FUNCTION
    });
    return status;
}

// CREATE EDIT BUTTON FUNCTION
function createEditButton(li, todoItem) {
    let editBtn = document.createElement('button'); //CREATE EDIT BUTTON
    editBtn.setAttribute('id', 'edit');             //SET EDIT BUTTON ID
    editBtn.innerText = 'Edit';                     //SET EDIT BUTTON TEXT
    editBtn.addEventListener('click', () =>{
        enableEditing(li, todoItem);                //CALLS ENABLE EDITING FUNCTION
    });
    return editBtn;  
}

//CREATE SAVE BUTTON FUNCTION
function createSaveButton(li, todoItem) {
    let saveBtn = document.createElement('button'); //CREATE SAVE BUTTON
    saveBtn.setAttribute('id', 'save');             //SET SAVE BUTTON ID
    saveBtn.innerText = 'Save';                     //SET SAVE BUTTON TEXT
    saveBtn.addEventListener('click', () =>{
        saveTask(li, todoItem);                     //CALLS SAVE TASK FUNCTION
    });
    return saveBtn;  
}
function createEditDateInput(todoItem) {
    let editDate = document.createElement('input');  //CREATE EDIT DATE INPUT
    editDate.setAttribute('type', 'date');           //SET EDIT DATE INPUT TYPE
    editDate.setAttribute('id', 'editDate');         //SET EDIT DATE INPUT ID
    editDate.setAttribute('value', todoItem.date);   //SET EDIT DATE INPUT VALUE
    return editDate;
}

function creatEditInput(todoItem) {
    let editInput = document.createElement('input'); //CREATE EDIT INPUT
    editInput.setAttribute('type', 'text');          //SET EDIT INPUT TYPE
    editInput.setAttribute('id', 'editInput');       //SET EDIT INPUT ID
    editInput.setAttribute('value', todoItem.name);  //SET EDIT INPUT VALUE
    return editInput;
}

//ADD TODO ITEM FUNCTION
function addTask(){
    let dateInput = document.querySelector('.dateInput').value; //GETS DATE INPUT
    let userInput = document.querySelector('.userInput').value; //GETS USER INPUT
    let categorySelected = document.querySelector('.categorySelected').value; //GETS CATEGORY SELECTED
 
    fetch('/api/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userInput,
            category: categorySelected,
            date: dateInput
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        taskView(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

 }
 
 addInput = document.querySelector('.addInput');                //GETS ADD BUTTON
 addInput.addEventListener('click', (event) => {
     addTask();                                                 //CALLS ADD TODO ITEM FUNCTION
     taskView(todo);                                            //CALLS VIEW FUNCTION  
     countTasks(todo); //CALLS COUNT FUNCTION  
 })

// DELETE TASK FUNCTION
function deleteTask(li) {
    fetch('/api/todo/' + li.id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        taskView(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

//CLEAR COMPLETED ITEMS FUNCTION
let clear = document.querySelector('.clear');                  //GETS CLEAR BUTTON
function clearList(){
    completed.innerText='';                                    //CLEARS COMPLETED LIST
    todo = todo.filter(todoItem => {                     //FILTERS OUT COMPLETED ITEMS
        return todoItem.status == false;
    })

    todo.forEach(todoItem => {                           //LOOPS THROUGH TODO LIST
        todoItem.id = todo.indexOf(todoItem);                  //SETS TODO ITEM ID
    })
}
taskView(todo);                                              //CALLS VIEW FUNCTION


clear.addEventListener('click', () => {
    clearList();                                              //CALLS CLEAR COMPLETED ITEMS FUNCTION
})

// TOGGLE STATUS FUNCTION
function toggleStatus(status, todoItem) {
    fetch('/api/todo/status', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status.checked,
            id: todoItem.id // Use the correct ID from the todoItem object
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        taskView(data); // Assuming the server sends back the updated list
        countTasks(data); //CALLS COUNT FUNCTION
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



function createEditCategorySelect(todoItem) {
    let editCategory = document.createElement('select'); //CREATE EDIT CATEGORY SELECT
    editCategory.setAttribute('id', 'editCategory');     //SET EDIT CATEGORY SELECT ID
    editCategory.setAttribute('class', 'categorySelected'); //SET EDIT CATEGORY SELECT CLASS

    categories.forEach(category => { //LOOPS THROUGH CATEGORIES
        let option = createCategoryOption(category, todoItem.category); //CREATE CATEGORY OPTION
        editCategory.appendChild(option); //APPENDS CATEGORY OPTION TO EDIT CATEGORY SELECT
    });

    return editCategory;
}

function createCategoryOption(category, selectedCategory) {
    let option = document.createElement('option'); //CREATE CATEGORY OPTION
    option.value = category.name; //SET CATEGORY OPTION VALUE
    option.innerText = category.name; //SET CATEGORY OPTION TEXT
    if (category.name === selectedCategory) {
        option.selected = true; //SET SELECTED IF MATCHES TODO ITEM CATEGORY
    }
    return option;
}



//EDIT TASK FUNCTION
function enableEditing(li, todoItem) {
    let editDate = createEditDateInput(todoItem);       //CREATE EDIT DATE INPUT
    let editInput = creatEditInput(todoItem);           //CREATE EDIT INPUT
    let editCategory = createEditCategorySelect(todoItem); //CREATE EDIT CATEGORY SELECT
    let saveBtn = createSaveButton(li, todoItem);       //CREATE SAVE BUTTON
    editCategory.value = todoItem.category;             //SET EDIT CATEGORY SELECT VALUE
    li.innerText = '';                                 //CLEAR LIST ITEM TEXT
    li.appendChild(editDate);                          //APPEND EDIT DATE INPUT TO LIST ITEM
    li.appendChild(editInput);                         //APPEND EDIT INPUT TO LIST ITEM
    li.appendChild(editCategory);                      //APPEND EDIT CATEGORY SELECT TO LIST ITEM
    li.appendChild(saveBtn);                           //APPEND SAVE BUTTON TO LIST ITEM
}

// SAVE TASK FUNCTION
function saveTask(li, todoItem) {
    let editInput = document.querySelector('#editInput'); //GETS EDIT INPUT
    let editDate = document.querySelector('#editDate');   //GETS EDIT DATE INPUT
    let editCategory = document.querySelector('#editCategory'); // Change to 'editCategory'

    todoItem.date = editDate.value;                        //SETS TODO ITEM DATE TO EDIT DATE INPUT VALUE
    todoItem.name = editInput.value;                       //SETS TODO ITEM NAME TO EDIT INPUT VALUE
    todoItem.category = editCategory.value;                //SETS TODO ITEM CATEGORY TO EDIT CATEGORY SELECT VALUE

    li.innerText = todoItem.category + ' ' + todoItem.date +   ' ' +todoItem.name;  //SETS LIST ITEM TEXT TO TODO ITEM DATE AND NAME

    taskView(todo);                                        //RELOADS VIEW

    console.log(todo);
}


// CATEGORY VIEW FUNCTION
function categoryView(categorySelected) {
    let filteredList; //LIST OF TASKS TO DISPLAY

    if (categorySelected === 'All') {                      //SHOW ALL TASKS
        
        filteredList = todo;                              //DISPLAYS ALL TASKS
    } else {
        
        filteredList = todo.filter(todoItem => {   //SHOW TASKS FOR SELECTED CATEGORY
            return todoItem.category === categorySelected; //FILTERS OUT TASKS THAT DON'T MATCH SELECTED CATEGORY
        });
    }

    taskView(filteredList);
    countTasks(filteredList); //CALLS COUNT FUNCTION
}

//COUNT FUNCTION
function countTasks(todoItem) {
    let count = 0;
    let countDisplay = document.querySelector('.count');
    todoItem.forEach(todoItem => {
        if(todoItem.status === false) {
            count++;
        }
    });
    countDisplay.innerText = "There are " + count + " tasks left to complete";
}
countTasks(todo); //CALLS COUNT FUNCTION

//TASK VIEW FUNCTION
async function taskView(todo){
    list.innerText = '';
    completed.innerText='';

    todo.forEach(todoItem =>{
        let li = createListItem(todoItem);             //CREATES LIST ITEM
        let status = createStatusInput(todoItem);      //CREATES STATUS INPUT
        let deleteBtn = createDeleteButton(li);        //CREATES DELETE BUTTON
        let editBtn = createEditButton(li, todoItem);  //CREATES EDIT BUTTON

        li.appendChild(status); 
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        if(todoItem.status) {
            completed.appendChild(li); //APPENDS COMPLETED TASKS TO COMPLETED LIST
        } else {
            list.appendChild(li);     //APPENDS INCOMPLETE TASKS TO TODO LIST
        }
    });
}


taskView(todo); //CALLS VIEW FUNCTION
