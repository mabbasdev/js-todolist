const todoSection = document.getElementById("todo-section");
const todoInput = document.getElementById("todo-input");
const addTodo = document.getElementById("add-btn");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem('todoListValues'));
}
const updateLocalStorage = (todoListArr) => {
    return localStorage.setItem('todoListValues', JSON.stringify(todoListArr))
    
}
// get data from localstorage or show empty array
let todoListArr = getTodoListFromLocal() || [];

const addDynamicTodoElements = (curElem) => {
    const todoList = document.createElement('ul');
    todoList.id = 'todo-list';
    
    todoList.innerHTML = `
    <li class="todo-item" data-id="1">
    <input type="checkbox" />
    <span class="todo-text">${curElem}</span>
    <button class="delete-btn" title="Delete task">×</button>
    </li>`;
    
    todoSection.append(todoList);
}

const addTodoList = (e) => {
    
    
    const todoListValue = todoInput.value.trim()
    
    todoInput.value = '';

    // if the data isn't present then add it else dont
    if (todoListValue !== "" && !todoListArr.includes(todoListValue)) {
        
        // store values in localStorage
        todoListArr.push(todoListValue)
        
        todoListArr = [... new Set(todoListArr)]
        localStorage.setItem('todoListValues', JSON.stringify(todoListArr))
        console.log(todoListArr);
        addDynamicTodoElements(todoListValue)
    }

    
}

const showTodoList = () => {
    console.log(todoListArr);
    
    todoListArr.forEach(curElem => {
        addDynamicTodoElements(curElem)
    });
}
showTodoList()

const removeTodoItem = (e) => {
    let itemToRemove = e.target;
    console.log(itemToRemove)
    let itemToRemoveContent = itemToRemove.previousElementSibling.innerHTML;
    const parentElemLi = itemToRemove.parentElement;
    const parentElem = parentElemLi.parentElement;
    console.log(itemToRemove)
    console.log(itemToRemoveContent);

    todoListArr = todoListArr.filter((curElem) => {
        return curElem !== itemToRemoveContent;
    })

    updateLocalStorage(todoListArr)
    console.log(todoListArr);
    
    parentElem.remove();

}


addTodo.addEventListener(('click'), () => {
    addTodoList();
})

todoSection.addEventListener(('click'), (e) => {
    if (e.target.classList.contains("delete-btn")) {   
        removeTodoItem(e);
    }
})