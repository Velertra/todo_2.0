/* 
const toDoTasks1 = new toDoTasks("Complete Project", "Finish coding the project", "2023-08-31", "High");

console.log(toDoTasks1); 


class Projects {
    constructor(...args){
       // this.home = home;
        this.args = args;
    }
}

console.log(projectList);


function createBtn(domLocation, ...para){
    for(const text of para) { 
        let btn = document.createElement('button');
        btn.setAttribute('id', text);
        btn.textContent = 'text';
        domLocation.appendChild(btn);
    }
}
 */

//createBtn(document.body, 'one', 'two', 'three');

//todolist.js // saves form information to local storage while creating array for list. then parses information
class TodoList {
    constructor() {
        this.task = [];
    }
    saveData(task) {
        this.task.push(task)
        localStorage.setItem('task', JSON.stringify(this.task));
    }
    loadSavedData() {
        const taskString = localStorage.getItem('task');
        if(taskString) {
            this.task = JSON.parse(taskString);
        }
    }
}

//form EventListener, form values. sends to array.
document.addEventListener('DOMContentLoaded', () => {
    const todoListSection = new TodoList();
    

    todoListSection.loadSavedData();
    
    const form = document.getElementById('task_form');
    const taskContainer = document.getElementById('task_container');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due_date').value;
        const priority = document.getElementById('priority').value;
        const notes = document.getElementById('notes').value;

        const task = {
            title,
            description,
            dueDate,
            priority,
            notes
        };

        todoListSection.saveData(task);

        form.reset();
    });
    const renderButton = document.getElementById('home_btn');
    renderButton.addEventListener('click', () => {
        renderAllTasks(todoListSection.task, taskContainer)
    });

    function renderAllTasks(tasks, container) {
        container.innerHTML = '';
        tasks.forEach(task => {
            renderTask(task, container);
        });
    }

    function renderTask(task, container) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.description}</p>`
        ;
    container.appendChild(taskItem);
    }
});

console.log(localStorage.task);

