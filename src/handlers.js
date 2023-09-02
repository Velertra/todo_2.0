
class TodoList {
    constructor() {
        this.sectionArray = {};
        this.trialArray = {};
       
    }
    createNewFolderDivs(folderName) {
        //let containerDiv = document.getElementById('')
        let folderInput = document.createElement('option');
        folderInput.setAttribute('name', 'folder_choices');
        folderInput.setAttribute('value',folderName);
        folderInput.textContent = folderName;
        folder_selections.appendChild(folderInput);
        let folderDiv = document.createElement('button');
        folderDiv.setAttribute('id', 'new_folder_div');
        folderDiv.innerHTML = folderName;
        
        section_div.appendChild(folderDiv);
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
    //
    createTaskArray(){
        let selectedSection = 'default';
        this.sectionInputs = document.querySelectorAll('option[name="folder_choices"]');
        console.log(this.sectionInputs);
        this.sectionInputs.forEach(input => {
            try{
                if(input.selected) {
                selectedSection = input.value;
                console.log(selectedSection);
                
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
                //this.ShowFolders(this.sectionArray);
            }
        } catch(error) {
            console.error('Error rendering all tasks', error);
        }
    }
};
/* 
let neededForDisplayRender = TodoList();
neededForDisplayRender.loadSavedData(); */


document.addEventListener('DOMContentLoaded', () => {
    const todoListSection = new TodoList();
        try{
        const form = document.getElementById('task_form');
        const formSection = document.querySelectorAll('.form_container');
        const taskContainer = document.getElementById('task_container');
        const renderButton = document.getElementById('home_btn');
        //dropdowns/hidden variables
        const displayFolders = document.getElementById('section_div');
        const folderLabelBtn = document.querySelectorAll('.section_btn');
        const newTaskBtn = document.getElementById('new_task');
        const hiddenBtn = document.querySelectorAll('[name="hide_button"]');
        const newFolderBtn = document.getElementById('new_folder');
        const folderTextBtn  = document.querySelectorAll('.folder_text');
        const folderText = document.getElementById('folder_text');

       
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
        displayFolders.addEventListener('click', () => {
            folderLabelBtn.forEach(label => {             //remember its the div not a button
                label.classList.toggle('hidden');
            })
        })
        newTaskBtn.addEventListener('click', () => {
            formSection.forEach(input => {
                input.classList.toggle('hidden');
            })
        })
        newFolderBtn.addEventListener('click', () => {
            folderTextBtn.forEach(input => {
                input.classList.toggle('hidden');
            })
        })
        folderText.addEventListener("keydown", function(e) {
            if(e.key === "Enter") {
                e.preventDefault();
                let utility = new TodoList();
                utility.createNewFolderDivs(folderText.value);
                folderText.value = '';
            }
        })
    } catch(error) {
        console.error('Error during initialization:', error);
    }
});