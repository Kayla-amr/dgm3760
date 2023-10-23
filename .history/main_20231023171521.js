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


//VIEW TODO LIST FUNCTION
function taskView(todo){
    list.innerText = '';   
    completed.innerText='';         //CLEARS TODO LIST

    todo.forEach(function(todoItem) //LOOPS THROUGH TODO LIST
    {
        //CREATES TODO ITEM ELEMENTS
        let li = document.createElement('li');  //CREATES LI ELEMENT
        li.setAttribute('id', todoItem.id)      //SETS LI ID
        li.innerText = todoItem.date + ' ' + todoItem.name;

        //CREATES INPUT ELEMENT
        let status = document.createElement('input'); //CREATES INPUT ELEMENT
        status.setAttribute('type', 'checkbox');      //SETS INPUT TYPE
        status.setAttribute('id', 'status');          //SETS INPUT ID
        status.setAttribute('value', todoItem.status);//SETS INPUT VALUE
        status.checked = todoItem.status;             //SETS INPUT CHECKED STATUS

        //ADDS EVENT LISTENER TO INPUT
        status.addEventListener('click', function(){  //ADDS EVENT LISTENER TO INPUT
            if(status.checked == true){               //CHECKS IF INPUT IS CHECKED
                todoItem.status = true;               //SETS TODO ITEM STATUS TO TRUE
                completed.appendChild(li);            //ADDS TODO ITEM TO COMPLETED LIST
                list.removeChild(li);                 //REMOVES TODO ITEM FROM TODO LIST
            }
            else{
                todoItem.status = false;              //SETS TODO ITEM STATUS TO FALSE
                list.appendChild(li);                 //ADDS TODO ITEM TO TODO LIST
                completed.removeChild(li);            //REMOVES TODO ITEM FROM COMPLETED LIST
            }
        })

        //CREATES DELETE BUTTON
        let deleteBtn = document.createElement('button'); //CREATES BUTTON ELEMENT
        deleteBtn.setAttribute('id', 'delete');           //SETS BUTTON ID
        deleteBtn.innerText = 'X';                        //SETS BUTTON TEXT

        //ADDS EVENT LISTENER TO DELETE BUTTON
        deleteBtn.addEventListener('click', function(){   //ADDS EVENT LISTENER TO DELETE BUTTON
            todo = todo.filter(function(todoItem){         //FILTERS OUT DELETED TODO ITEM
                return todoItem.id != li.id;
            })
            taskView(todo);                                //CALLS VIEW FUNCTION
        })

        //CREATES EDIT BUTTON
        let editBtn = document.createElement('button');   //CREATES BUTTON ELEMENT
        editBtn.setAttribute('id', 'edit');               //SETS BUTTON ID
        editBtn.innerText = 'Edit';                       //SETS BUTTON TEXT

        //ADDS EVENT LISTENER TO EDIT BUTTON
        editBtn.addEventListener('click', function(){      //ADDS EVENT LISTENER TO EDIT BUTTON
            let editInput = document.createElement('input'); //CREATES INPUT ELEMENT
            editInput.setAttribute('type', 'text');          //SETS INPUT TYPE
            editInput.setAttribute('id', 'editInput');       //SETS INPUT ID
            editInput.setAttribute('value', todoItem.name);  //SETS INPUT VALUE
            li.innerText = '';                               //CLEARS TODO ITEM TEXT
            li.appendChild(editInput);                       //ADDS INPUT TO TODO ITEM

            //ADDS EVENT LISTENER TO INPUT
            editInput.addEventListener('keyup', function(){  //ADDS EVENT LISTENER TO INPUT
                if(event.keyCode === 13){                    //CHECKS IF ENTER KEY IS PRESSED
                    todoItem.name = editInput.value;         //SETS TODO ITEM NAME TO INPUT VALUE
                    li.innerText = todoItem.date + ' ' + todoItem.name;            //SETS TODO ITEM TEXT TO TODO ITEM NAME
                    li.appendChild(status);                  //ADDS INPUT TO TODO ITEM
                    li.appendChild(deleteBtn);               //ADDS DELETE BUTTON TO TODO ITEM
                    li.appendChild(editBtn);                 //ADDS EDIT BUTTON TO TODO ITEM
                }
            })
        }
        )

        //CHECKS TODO ITEM STATUS
        if(todoItem.status != true){                
            list.appendChild(li);                    //ADDS TODO ITEM TO TODO LIST
            li.appendChild(status);                  //ADDS INPUT TO TODO ITEM
            li.appendChild(deleteBtn);               //ADDS DELETE BUTTON TO TODO ITEM
            li.appendChild(editBtn);                 //ADDS EDIT BUTTON TO TODO ITEM

        }
        else 
        {
            completed.appendChild(li);                    //ADDS TODO ITEM TO COMPLETED LIST
            li.appendChild(status);                       //ADDS INPUT TO TODO ITEM
            li.appendChild(deleteBtn);                    //ADDS DELETE BUTTON TO TODO ITEM
            
        }
    })
}
taskView(todo); //CALLS VIEW FUNCTION

function categoryView(todo){
    let categorySelected = document.querySelector('.categorySelected').value; //GETS CATEGORY SELECTED
    let filteredList = todo.filter(function(todoItem){                         //FILTERS TODO LIST BY CATEGORY
        return todoItem.category === categorySelected;
    })

    id
    taskView(filteredList);                                                    //CALLS VIEW FUNCTION
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

