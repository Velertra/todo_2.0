class TodoList {
    constructor() {
        this.sectionArray = [];
        this.secondaryArrays = [];
        this.trialArray = {};
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.dueDate = document.getElementById('due_date');
        this.priority = document.getElementById('priority');
        this.notes = document.getElementById('notes');
        this.folderSelction  = document.getElementById('folder_selections');
        this.selectedSection = 'default';     
    }
    createFolderDivs(folderName) {
        let folderInput = document.createElement('option');
        folderInput.setAttribute('name', 'folder_choices');
        folderInput.setAttribute('id', 'folder_choices');
        folderInput.setAttribute('value',folderName);
        folderInput.textContent = folderName;
        folder_selections.appendChild(folderInput);

        let folderDiv = document.createElement('button');
        folderDiv.setAttribute('type', 'button');
        folderDiv.setAttribute('id', folderName);
        folderDiv.setAttribute('name', folderName);
        folderDiv.setAttribute('class', "folder_pick");
        folderDiv.textContent = folderName;
        section_btn.appendChild(folderDiv);
        //this.pickFolder();
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
        document.getElementById('task_form').reset();
    }
 /*    setLocalStorage(tasks){
        if(localStorage.length === 0){
            localStorage.setItem('myData', JSON.stringify(tasks));
            this.sectionArray.push(tasks);
        } else {
            this.sectionArray.push(tasks);
            localStorage.setItem('myData', JSON.stringify(this.sectionArray));
        }
    } */
    renderTask2(display){
        this.removeDivContainer()
        for(const arrayOfChoice in  display){
            const taskItem = document.createElement('div');
            taskItem.setAttribute('id', "task_div");
            taskItem.classList = display[arrayOfChoice].title;
            taskItem.innerHTML = display[arrayOfChoice].title;
            task_container.appendChild(taskItem);
        }
    }
    removeDivContainer(){
        const container = document.getElementById('task_container');
        while(container.firstChild) {
            container.removeChild(container.firstChild)
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
    pickFolder(){
        const foldersInTopDiv = document.querySelectorAll('.folder_pick');  
       
       /*  foldersInTopDiv.forEach((input) => {
            input.addEventListener('click', () => {
                console.log(foldersInTopDiv[input])
            })
        }) */
        /* foldersInTopDiv.forEach(input => {
            input.addEventListener('click', (e) => {
                //console.log(e.target.textContent);
                if()
            })
        }) */
        /* for(let x = 0; x < foldersInTopDiv.length; x++){
            foldersInTopDiv[x].addEventListener('click', (e) => {
                console.log(foldersInTopDiv[x]);
                
            })
            if(x === 1){
                    return;
                }
        } */
    }
    filterArray(arrChoice){
        //this.secondaryArrays = [];
        //let subArray = [];
     /*    let newArray = this.sectionArray.filter(arr => arr.incudes(arrChoice));
      
 */ 
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const todoListSection = new TodoList();
        try{
        const form = document.getElementById('task_form');
        const formSection = document.getElementById('form_container');
        const renderButton = document.getElementById('home_btn');
        
        const displayFolders = document.getElementById('open_folders');
        const folderLabelBtn = document.getElementById('section_btn');
        const newTaskBtn = document.getElementById('new_task');
        const newFolderBtn = document.getElementById('new_folder');
        const folderTextBtn  = document.getElementById('folder_text');
        const folderText = document.getElementById('folder_text');

       
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            todoListSection.createTaskArray();
        });
        renderButton.addEventListener('click', () => {
            todoListSection.renderTask2(todoListSection.sectionArray);
             });
        displayFolders.addEventListener('click', () => {
            folderLabelBtn.classList.toggle('hidden');
        })
        newTaskBtn.addEventListener('click', () => {
            formSection.classList.toggle('hidden');
            
        })
        newFolderBtn.addEventListener('click', () => {
                folderTextBtn.classList.toggle('hidden');
        })
        folderText.addEventListener("keydown", function(e) {
            
            if(e.key === "Enter") {
                e.preventDefault();
                //this.sectionArray.push(task);
                todoListSection.sectionArray.push(folderText.value)
                todoListSection.createFolderDivs(folderText.value);
                folderText.value = '';
            }

            //todoListSection.pickFolder();
           /*  todoListSection.sectionArray.forEach(picks => {

            }) */
        })

    } catch(error) {
        console.error('Error during initialization:', error);
    }
});


document.addEventListener('click', function(e){
    if(e.target.classList.value=='folder_pick'){
        
        /* for(let x = 0; x < foldersInTopDiv.length; x++){
            foldersInTopDiv[x].addEventListener('click', (e) => {
                console.log(foldersInTopDiv[x]);
                
            })
        }  */
        const needToWork = new TodoList();
        console.log(needToWork.sectionArray)
    }
})

