// SELECTORS
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')


// EVENT LISTENERS
    // Add todo item
todoButton.addEventListener('click', addTodo)
    // Delete todo item
todoList.addEventListener('click', deleteCheck)
    // filter todos
filterOption.addEventListener('click', filterTodo)
    // get todos from localStorage on load
document.addEventListener('DOMContentLoaded', getTodos)


// FUNCTIONS

function addTodo(e) {
    // prevent form from submitting
    e.preventDefault()

    // create todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    // add todo to local storage
    saveLocalTodos(todoInput.value)

    // Checked item
    const completed = document.createElement('button')
    completed.innerHTML = '<i class="fas fa-check"></i>'
    completed.classList.add('complete-button')
    todoDiv.appendChild(completed)

    // Trash item
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-button')
    todoDiv.appendChild(trashButton)

    // Append to list
    todoList.appendChild(todoDiv)

    // Clear input
    todoInput.value = ""
}

function deleteCheck(e) {
    const item = e.target
    // Delete todo item
    if(item.classList[0] === 'trash-button'){
        // selecting parent element of trash button (todo item)
        const todo = item.parentElement
        // Delete animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        // deleting parent item AFTER transition is complete
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }

    // Check todo item
    if(item.classList[0] === "complete-button"){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex'
                break
            case "completed":
                if(todo.classList.contains('completed'))  {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }  
                break
            case "incomplete":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                } 
                break
        }
    })
}

function saveLocalTodos(todo) {
    // check if todos are already saved
    let todos
    if(localStorage.getItem('todos') === null){
    todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    // check if todos are saved
    let todos
    if(localStorage.getItem('todos') === null){
    todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
        // create todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        // create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        // Checked item
        const completed = document.createElement('button')
        completed.innerHTML = '<i class="fas fa-check"></i>'
        completed.classList.add('complete-button')
        todoDiv.appendChild(completed)

        // Trash item
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-button')
        todoDiv.appendChild(trashButton)

        // Append to list
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    // check if todos are saved
    let todos
    if(localStorage.getItem('todos') === null){
    todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    // finding the value of the element to be removed
    const todoIndex = todo.children[0].innerText
    // first arg is index position of element to be removed, second argument is how many elements to remove
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}