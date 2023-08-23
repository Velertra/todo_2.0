class Task {
    constructor(title, description, dueDate, priority) {
        this.tile = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const task1 = new Task("Complete Project", "Finish coding the project", "2023-08-31", "High");

console.log(task1);