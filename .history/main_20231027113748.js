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

document.querySelector('.app > h1').innerText = 'To Do List 2023';

let list = document.querySelector('.list');
let completed = document.querySelector('.completed');


/*CREATING ELEMENTS*/


//CREATE LIST ITEM FUNCTION
function createListItem(todoItem) {
    let li = document.createElement('li'); //CREATE LIST ITEM
    li.setAttribute('id', todoItem.id);    //SET LIST ITEM ID
    li.innerText = todoItem.date + ' ' + todoItem.name; //SET LIST ITEM TEXT
    return li;
}

//CREATE DELETE BUTTON FUNCTION
function createDeleteButton(li) {
    let deleteBtn = document.createElement('button');//CREATE DELETE BUTTON
    deleteBtn.setAttribute('id', 'delete');          //SET DELETE BUTTON ID
    deleteBtn.innerText = 'X';                       //SET DELETE BUTTON TEXT
    deleteBtn.addEventListener('click', function(){  //ADD EVENT LISTENER TO DELETE BUTTON
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
    status.addEventListener('click', function(){
        toggleStatus(status, todoItem);            //CALLS TOGGLE STATUS FUNCTION
    });
    return status;
}

// CREATE EDIT BUTTON FUNCTION
function createEditButton(li, todoItem) {
    let editBtn = document.createElement('button'); //CREATE EDIT BUTTON
    editBtn.setAttribute('id', 'edit');             //SET EDIT BUTTON ID
    editBtn.innerText = 'Edit';                     //SET EDIT BUTTON TEXT
    editBtn.addEventListener('click', function(){
        enableEditing(li, todoItem);                //CALLS ENABLE EDITING FUNCTION
    });
    return editBtn;  
}

//ADD TODO ITEM FUNCTION
function addTask(){
    let userInput = document.querySelector('.userInput').value; //GETS USER INPUT
    let categorySelected = document.querySelector('.categorySelected').value; //GETS CATEGORY SELECTED
    let dateInput = document.querySelector('.dateInput').value; //GETS DATE INPUT
 
    const newItem = {                                          //CREATES NEW TODO ITEM OBJECT
          id: todo.length,
          name: userInput,
          category: categorySelected,
          date: dateInput,
          status: false
     }
     
     if (userInput === ''){                                     //CHECKS IF USER INPUT IS EMPTY
         alert('Please enter a task');                          //ALERTS USER TO ENTER A TASK
         return false;
     }
     else if (todo.some(todoItem => todoItem.name === userInput)){ //CHECKS IF USER INPUT IS A DUPLICATE
         alert('This task already exists');                        //ALERTS USER TO ENTER A UNIQUE TASK
         return false;
     }
     else{
         todo.push(newItem);                                     //PUSHES NEW TODO ITEM TO TODO LIST
     }
 
     document.querySelector('.userInput').value = '';          //CLEARS USER INPUT
 }
 
 addInput = document.querySelector('.addInput');                //GETS ADD BUTTON
 addInput.addEventListener('click', (event) =>{
     addTask();                                                 //CALLS ADD TODO ITEM FUNCTION
     taskView(todo);                                            //CALLS VIEW FUNCTION    
 })

// DELETE TASK FUNCTION
function deleteTask(li) {
    todo = todo.filter(todoItem => todoItem.id != li.id);  //FILTERS OUT DELETED TASK
    taskView(todo);                                       //RELOADS VIEW
}

//CLEAR COMPLETED ITEMS FUNCTION
let clear = document.querySelector('.clear');                  //GETS CLEAR BUTTON
function clearList(){
    completed.innerText='';                                    //CLEARS COMPLETED LIST
    todo = todo.filter(function(todoItem){                      //FILTERS OUT COMPLETED ITEMS
        return todoItem.status == false;
    })

    todo.forEach(function(todoItem){                            //LOOPS THROUGH TODO LIST
        todoItem.id = todo.indexOf(todoItem);                   //SETS TODO ITEM ID
    })
}

clear.addEventListener('click', (event) =>{
    clearList();                                               //CALLS CLEAR FUNCTION
    taskView(todo);                                            //CALLS VIEW FUNCTION
})

// TOGGLE STATUS FUNCTION
function toggleStatus(status, todoItem) {
    if(status.checked){ 
        todoItem.status = true;  //CHANGE STATUS TO TRUE
    } else {
        todoItem.status = false; //CHANGE STATUS TO FALSE
    }
    taskView(todo);              // RELOADS VIEW
}

//EDIT TASK FUNCTION
function enableEditing(li, todoItem) {
    let editInput = document.createElement('input'); //CREATE EDIT INPUT
    editInput.setAttribute('type', 'text');          //SET EDIT INPUT TYPE
    editInput.setAttribute('id', 'editInput');       //SET EDIT INPUT ID
    editInput.setAttribute('value', todoItem.name);  //SET EDIT INPUT VALUE
    li.innerText = '';                               //CLEAR LIST ITEM TEXT
    li.appendChild(editInput);                       //APPEND EDIT INPUT TO LIST ITEM
    editInput.addEventListener('keyup', function(){
        if(event.keyCode === 13){ 
            todoItem.name = editInput.value;
            li.innerText = todoItem.date + ' ' + todoItem.name;
            li.appendChild(createStatusInput(todoItem));
            li.appendChild(createDeleteButton(li));
            li.appendChild(createEditButton(li, todoItem));
        }
    });
}

// CATEGORY VIEW FUNCTION
function categoryView(categorySelected) {
    let filteredList; //LIST OF TASKS TO DISPLAY

    if (categorySelected === 'All') {                      //SHOW ALL TASKS
        
        filteredList = todo;                              //DISPLAYS ALL TASKS
    } else {
        
        filteredList = todo.filter(function (todoItem) {   //SHOW TASKS FOR SELECTED CATEGORY
            return todoItem.category === categorySelected; //FILTERS OUT TASKS THAT DON'T MATCH SELECTED CATEGORY
        });
    }

    taskView(filteredList);
}

//TASK VIEW FUNCTION
function taskView(todo){
    list.innerText = '';
    completed.innerText='';

    todo.forEach(function(todoItem){
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