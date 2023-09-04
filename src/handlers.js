class TodoList {
    constructor() {
        this.sectionArray = [];
        this.trialArray = {};
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.dueDate = document.getElementById('due_date');
        this.priority = document.getElementById('priority');
        this.notes = document.getElementById('notes');
        this.folderSelction  = document.getElementById('folder_selections');
        this.selectedSection = 'default';     
    }
    createFolderArray(folderName) {
        for(let x = 0; x <folderName; x++){
            this.trialArray.push(folderName[x]);    //fix this so that it takes in var and adds divs/option
            console.log(this.trialArray)
        }
        let folderInput = document.createElement('option');
        folderInput.setAttribute('name', 'folder_choices');
        folderInput.setAttribute('id', 'folder_choices');
        folderInput.setAttribute('value',folderName);
        folderInput.textContent = folderName;
        folder_selections.appendChild(folderInput);
        let folderDiv = document.createElement('input');
        folderDiv.setAttribute('id', 'folder_pick');
        folderDiv.setAttribute('type', 'button');
        folderDiv.innerHTML = `${folderDiv}`;
        section_div.appendChild(folderDiv);
    }
    createTaskArray() {
        let titleTxt = this.title.value;
        let descriptionTxt = this.description.value;
        let dueDateTxt = this.dueDate.value;
        let priorityTxt = this.priority.value;
        let notesTxt = this.notes.value;
        let folderChoice = this.folderSelction.value;   
        const task = {
            folder:folderChoice,
            title:titleTxt,
            description:descriptionTxt,
            dueDate:dueDateTxt,
            priority:priorityTxt,
            notes:notesTxt    
        };
        this.sectionArray.push(task);
   //     this.setLocalStorage(task)
        document.getElementById('task_form').reset();
    }
 /*    setLocalStorage(tasks){
        if(localStorage.length === 0){
            localStorage.setItem('myData', JSON.stringify(tasks));
            this.sectionArray.push(tasks);
            console.log(this.sectionArray);
        } else {
            this.sectionArray.push(tasks);
            localStorage.setItem('myData', JSON.stringify(this.sectionArray));
        }
    } */
    renderTask2(){
        //add if statement, if containers empty, dont dont this. (!task_container === 0?) i know not that. 
        const taskItem = document.createElement('div');
        const titleNames = this.sectionArray.map(input => input.title);
        console.log(titleNames)
        taskItem.classList = `${titleNames}`;
        taskItem.innerHTML = `${titleNames}`
        task_container.appendChild(taskItem);
    }
    pickFolder(){

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
            todoListSection.renderTask2();

            
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
                utility.createFolderArray(folderText.value);
                folderText.value = '';
            }
        })

    } catch(error) {
        console.error('Error during initialization:', error);
    }
});












/* 

class TodoList {
    constructor(title) {
        this.sectionArray = {};
        this.trialArray = {};
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.dueDate = document.getElementById('due_date');
        this.priority = document.getElementById('priority');
        this.notes = document.getElementById('notes');
       
    }
    createFolderArray(folderNames) {
        for(let x = 0; x <folderNames; x++){
            this.trialArray.push(folderName[x]);
            console.log(this.trialArray)
        }

    }
    createSection2(arrayKey){
        if(arrayKey in this.trialArray){
            this.trialArray[arrayKey] = []
        }
    }
    createTaskArray() {
        //pickFolder();              //set folder as key
        let titleTxt = this.title.value;
        let descriptionTxt = this.description.value;
        let dueDateTxt = this.dueDate.value;
        let priorityTxt = this.priority.value;
        let notesTxt = this.notes.value; 
        let folderSelction = document.getElementById('folder_selections');
        const arrayKey = folderSelction.value;        
        
        if(arrayKey in this.trialArray){
            this.createSection2(arrayKey)
        }
        

        const task = {
            title:titleTxt,
            description:descriptionTxt,
            dueDate:dueDateTxt,
            priority:priorityTxt,
            notes:notesTxt
        };

        this.trialArray[arrayKey].push(task);

        console.log(this.trialArray);
    }
} */