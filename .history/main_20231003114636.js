let todo = [
    {
    id: 0,
    name: 'View Training Module',
    date: '2020-01-01',
    status: false

},
{
    id: 1,
    name: 'Read Require Reads',
    date: '2020-01-01',
    status: true
},
{
    id: 2,
    name: 'Complete Assignment',
    date: '2020-01-01',
    status: true
},
{
    id: 3,
    name: 'Submit Assignment',
    date: '2020-01-01',
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
        if(todoItem.status != true){                //CHECKS IF TODO ITEM IS DONE
            let li = document.createElement('li');  //CREATES LI ELEMENT
            li.setAttribute('id', todoItem.id)      //SETS LI ID
            li.innerText = todoItem.name;           //DISPLAYS TODO ITEM
            list.appendChild(li);                   //ADDS TODO ITEM TO LIST

            let status = document.createElement('input'); //CREATES INPUT ELEMENT
            status.setAttribute('type', 'checkbox');      //SETS INPUT TYPE
            status.setAttribute('id', 'status');          //SETS INPUT ID
            status.setAttribute('value', todoItem.status);//SETS INPUT VALUE
            status.checked = todoItem.status;             //SETS INPUT CHECKED STATUS
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
            li.appendChild(status);                       //ADDS INPUT TO TODO ITEM

        }
        else 
        {
            let li = document.createElement('li');        //CREATES LI ELEMENT
            li.setAttribute('id', todoItem.id)            //SETS LI ID
            li.innerText = todoItem.name;                 //DISPLAYS TODO ITEM
            completed.appendChild(li);                    //ADDS TODO ITEM TO COMPLETED LIST

            let status = document.createElement('input'); //CREATES INPUT ELEMENT
            status.setAttribute('type', 'checkbox');      //SETS INPUT TYPE
            status.setAttribute('id', 'status');          //SETS INPUT ID
            status.setAttribute('value', todoItem.status);//SETS INPUT VALUE
            status.checked = todoItem.status;             //SETS INPUT CHECKED STATUS
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
            li.appendChild(status);                       //ADDS INPUT TO TODO ITEM
            
        }
    })
}
taskView(todo); //CALLS VIEW FUNCTION

//ADD TODO ITEM FUNCTION
function addTask(){
   let userInput = document.querySelector('.userInput').value; //GETS USER INPUT

   const newItem = {                                          //CREATES NEW TODO ITEM OBJECT
         id: todo.length,
         name: userInput,
         date: '2020-01-01',
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



//EDIT TODO ITEM FUNCTION


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







