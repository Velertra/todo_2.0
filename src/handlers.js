class TodoList {
    constructor() {
        this.sectionArray = {};
        this.sectionInputs = document.querySelectorAll('option[name="sections"]');
    }
    createSection(sectionName) {
        try{
            if(!this.sectionArray[sectionName]) {
                this.sectionArray[sectionName] = [];
            } 
        } catch(error) {
            console.error('Error creating section', error);
        }
    }
    createTaskArray(){

        let selectedSection = 'default';
        this.sectionInputs.forEach(input => {
            try{
                if(input.selected) {
                selectedSection = input.value;
                }
            }catch(error) {
                console.error('Error section input', error);
            }
        });
        try {
            this.title = document.getElementById('title').value;
            this.description = document.getElementById('description').value;
            this.dueDate = document.getElementById('due_date').value;
            this.priority = document.getElementById('priority').value;
            this.notes = document.getElementById('notes').value;

            const task = {
                title:this.title,
                description:this.description,
                dueDate:this.dueDate,
                priority:this.priority,
                notes:this.notes
            };
            this.saveData(selectedSection, task);
            //bring in form div for now
            let form = document.getElementById('task_form')

            form.reset();
        } catch(error) {
            console.error('Error submitting form:', error);
        }
    }
    saveData(sectionName, task) {
        if(!this.sectionArray[sectionName]) {
            this.createSection(sectionName);
        }
        try{
            this.sectionArray[sectionName].push(task);
            localStorage.setItem('tasks', JSON.stringify(this.sectionArray));
        } catch(error) {
            console.error('Error saving data', error);
        }
    }
    loadSavedData() {
        try{
            const tasksString = localStorage.getItem('tasks');
            if(tasksString) {
                this.sectionArray = JSON.parse(tasksString);
            }
        } catch(error) {
            console.error('Error loading saved data', error);
        }
    }
    renderTask(task, container) {
             
            
        try{
            console.log(task)

            const taskItem = document.createElement('div');
            taskItem.className = `${task}`;
            taskItem.innerHTML = `<h2>${task}</h2>`
            container.appendChild(taskItem);
            
        } catch(error) {
            console.error('Error rendering task', error);
        }
    }
    renderAllTasks(section, container) {
        try{
            container.innerHTML = '';
            for(const sectionName in this.sectionArray) {
                const tasks = this.sectionArray[sectionName];
                tasks.forEach(task => {
                    this.renderTask(task, container);
                   
                });
                this.ShowFolders(this.sectionArray);
            }
        } catch(error) {
            console.error('Error rendering all tasks', error);
        }
    }
    ShowFolders(section){
        try{
            let test = new TodoList();
            const sectionContainer = document.getElementById('folder_container');
            sectionContainer.innerHTML = '';
            console.log(this.sectionArray)
            const keyArray = Object.keys(section);
            console.log(typeof keyArray)
            test.renderTask(keyArray, sectionContainer);

        } catch(error) {
            console.error('Error displaying DOMinfo', error);
        }
    }

};

//TodoList.ShowFolders();

document.addEventListener('DOMContentLoaded', () => {
    const todoListSection = new TodoList();
        try{
        const form = document.getElementById('task_form');
        const taskContainer = document.getElementById('task_container');
        const renderButton = document.getElementById('home_btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            todoListSection.createTaskArray();
        });

        renderButton.addEventListener('click', () => {
            try{
            todoListSection.renderAllTasks(todoListSection, taskContainer);
            } catch(error) {
                console.error('Error with renderButton EventListener', error);
            }
        });
    } catch(error) {
        console.error('Error during initialization:', error);
    }
});


