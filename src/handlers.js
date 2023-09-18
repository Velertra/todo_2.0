class TodoList {
    constructor() {
        this.sectionArray = [];
        this.secondaryArrays = [];
        this.folderNameArray = [];
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.dueDate = document.getElementById('due_date');
        this.priority = document.getElementById('priority');
        this.notes = document.getElementById('notes');
        this.folderSelction  = document.getElementById('folder_selections');  
        this.keySaver = 0;
        this.startKeySaver = '';
    }
    createFolderDivs(folderName) {
        let folderInput = document.createElement('option');
        folderInput.setAttribute('name', 'folder_choices');
        folderInput.setAttribute('id', 'folder_choices');
        folderInput.setAttribute('value',folderName);
        folderInput.textContent = folderName;
        folder_selections.appendChild(folderInput);

        let folderDiv = document.createElement('button');
        folderDiv.setAttribute('id', folderName);
        folderDiv.setAttribute('name', folderName);
        folderDiv.setAttribute('class', "folder_pick");
        folderDiv.textContent = folderName;
        section_btn.appendChild(folderDiv);
        const folderClass = new FolderClass();
        folderClass.addFolderBtn(folderDiv)
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
        this.saveToLocal(task, this.keySaver++);
        this.startKeySaver = this.keySaver;
        this.saveToLocal(this.startKeySaver, 'NumberToStart')
        document.getElementById('task_form').reset();
    }
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
    saveToLocal(task, section){
        let test = JSON.stringify(task);
        localStorage.setItem(section, test); 
    }
    storeLocalData(){
        let number = localStorage.getItem('NumberToStart');
        this.keySaver = Number(number);
    }
};

document.addEventListener('DOMContentLoaded', () => {
        try{
        const toDoListClass = new TodoList();
        const form = document.getElementById('task_form');
        const formSection = document.getElementById('form_container');
        const renderButton = document.getElementById('home_btn');
        const displayFolders = document.getElementById('open_folders');
        const folderLabelBtn = document.getElementById('section_btn');
        const newTaskBtn = document.getElementById('new_task');
        const newFolderBtn = document.getElementById('new_folder');
        const folderText = document.getElementById('folder_text');
       
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            toDoListClass.createTaskArray();
        });
        renderButton.addEventListener('click', () => {
            toDoListClass.renderTask2(toDoListClass.sectionArray);
             });
        /* displayFolders.addEventListener('click', () => {
            folderLabelBtn.classList.toggle('hidden');
        }) */
        newTaskBtn.addEventListener('click', () => {
            formSection.classList.toggle('hidden');
            
        })
        newFolderBtn.addEventListener('click', (e) => {
                folderText.classList.toggle('hidden');
                //console.log(folderText)
              /*   document.addEventListener('click', (e) => {

                //console.log(folderText)
                      if(e.target !== folderText && e.target !== newFolderBtn){
                        folderText.classList.toggle('hidden')
                }  
            })*/
               
        })
        folderText.addEventListener("keydown", function(e) {
            if(e.key === "Enter") {
                e.preventDefault();
                toDoListClass.folderNameArray.push(folderText.value)
                toDoListClass.createFolderDivs(folderText.value);
                folderText.value = '';   
                //folderText.classList.toggle('none');
            }
        })
        toDoListClass.storeLocalData();
    } catch(error) {
        console.error('Error during initialization:', error);
    }
});

//function to have the folder text dissapear when something else is hit
document.addEventListener('click', (event) => {
    const folderText = document.getElementById('folder_text');
    const newFolderBtn = document.getElementById('new_folder');
    let clickedInsideDiv = false;
    if (newFolderBtn == event.target ) {
        clickedInsideDiv = true;
      }
    if (!clickedInsideDiv && event.target !== folderText && folderText.classList.value == "folder_text hidden") { 
        folderText.classList.toggle('hidden');
    }
  });
  
  document.addEventListener('click', (event) => {
    const formSection = document.getElementById('form_container');
    const newTask = document.getElementById('new_task');
    let clickedInsideDiv = false;
    if (newTask == event.target ) {
        clickedInsideDiv = true;
      }
    if (!clickedInsideDiv && event.target !== formSection && formSection.classList.value == "form_container hidden" && !formSection.contains(event.target)) { 
        formSection.classList.toggle('hidden');
    }
  });

class FolderClass {
    constructor(){
        this.folderArray = [];
        this.eachFolder = document.querySelectorAll('.folder_pick');
    }
    addFolderBtn(value){
        const toDoClass = new TodoList();
        const folder = document.getElementById(value.innerHTML);
        folder.addEventListener('click', (e) => {
            this.createNewArray(folder);
        })        
    }
    createNewArray(value){
        const folderName = value.innerHTML;
        const toDoClass = new TodoList(); 
        for(let x = 0; x < localStorage.length; x++){ 
            if(typeof localStorage[x] == 'string'){
                const arr = JSON.parse(localStorage[x])
                if(arr.folder == folderName){
                    toDoClass.secondaryArrays.push(arr);
                }
            }
        }
        toDoClass.renderTask2(toDoClass.secondaryArrays)
    }
}