class toDoTasks {
    constructor(title, description, dueDate, priority) {
        this.tile = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const toDoTasks1 = new toDoTasks("Complete Project", "Finish coding the project", "2023-08-31", "High");

console.log(toDoTasks1); 


class Projects {
    constructor(...args){
       // this.home = home;
        this.args = args;
    }
}

const projectList = new Projects('one', 'two', 'three', 'four');

console.log(projectList);


function createBtn(domLocation, ...para){
    for(const text of para) { 
        let btn = document.createElement('button');
        btn.setAttribute('id', text);
        btn.textContent = 'text';
        domLocation.appendChild(btn);
    }
}


//createBtn(document.body, 'one', 'two', 'three');
