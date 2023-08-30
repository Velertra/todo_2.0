//todolist.js // saves form information to local storage while creating array for list. then parses information
class TodoList {
    constructor() {
        this.section = {}; // Change to an object
    }
    createSection(sectionName) {
        if(!this.section[sectionName]) {
            this.section[sectionName] = [];
        }
    }
    saveData(sectionName, task) {
        if(!this.section[sectionName]) {
            this.createSection(sectionName);
        }
        try{
            this.section[sectionName].push(task);
            //console.log('Saving Data:', this.section);
            localStorage.setItem('tasks', JSON.stringify(this.section));
        } catch(error){
            console.error('Error saving data:', error);
        }
    }
    loadSavedData() {
        try{
            const tasksString = localStorage.getItem('tasks');
            if(tasksString) {
                this.section = JSON.parse(tasksString);
            }
        } catch(error) {
            console.error('Error loading saved data:', error);
        }     
    }

    renderAllTasks(section, container) {
        try{
        container.innerHTML = '';
        for(const sectionName in this.section) {
            const tasks = this.section[sectionName];
            tasks.forEach(task => {
                this.renderTask(task, container);
            });
        }
        } catch(error) {
            console.error('Error rendering tasks:', error);
        }
    }

    renderTask(task, container) {
        try{
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>`
            ;
            container.appendChild(taskItem);
        } catch(error) {
            console.error('Error rendering task', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const todoListSection = new TodoList();
        try{
        todoListSection.loadSavedData();

        const form = document.getElementById('task_form');
        const taskContainer = document.getElementById('task_container');
        const renderButton = document.getElementById('home_btn');
        const sectionDiv = document.getElementById('section_div');
        const sectionInputs = document.querySelectorAll('input[name="section"]');
        const selectedSectionSpan = document.getElementById('selection_section');
        const sectionLabels = document.querySelectorAll('.section_btn');
        //const sectionDropdown = sectionDiv.querySelectorAll('.section');

        sectionDiv.addEventListener('click', () => {
            try {
                sectionLabels.forEach(label => {
                    label.classList.toggle('hidden');
                });
                console.log("btn Worked");
            } catch (error) {
                console.error('Error toggling section visibility:', error);
            }
        });
        

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let selectedSection = 'default';
            sectionInputs.forEach(input => {
                try{
                    if(input.checked) {
                    selectedSection = input.value;
                    console.log(selectedSection)
                    }
                }catch(error) {
                    console.error('Error section input', error);
                }
            });

            try {

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

                todoListSection.saveData(selectedSection, task);
                form.reset();
            } catch(error) {
                console.error('Error submitting form:', error);
            }
        });

        renderButton.addEventListener('click', () => {
            todoListSection.renderAllTasks(todoListSection.section, taskContainer);
        });
    } catch(error) {
        console.error('Error during initialization:', error);
    }
});