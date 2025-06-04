const addBtn = document.querySelector("#addBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const clearBtn = document.querySelector("#clearBtn");
let taskText;
const savedTask = localStorage.getItem("tache");
const tasks = [];

if (savedTask) {
    const table = JSON.parse(savedTask);  
    tasks.push(...table);  
}

const nettoyerDOM = () => {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
};

const render = () => {
        nettoyerDOM();
        for (let task of tasks) {
            let createTask = document.createElement("li");
            createTask.classList.add("toBeRemoved");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "checkbox";
            let label = document.createElement("label");
            let createRemoveBtn = document.createElement("button");
            let removeBtn = document.createElement("img");
            label.textContent = task.tache;
            removeBtn.src = "img/remove.svg";

            taskList.append(createTask);
            createTask.append(checkbox);
            createTask.append(label);
            createTask.append(createRemoveBtn);
            createRemoveBtn.append(removeBtn);

            createRemoveBtn.addEventListener("click", function() {
                let currentTask = tasks.indexOf(task);       
                tasks.splice(currentTask, 1);
                const jsonString = JSON.stringify(tasks);
                localStorage.setItem("tache", jsonString);
                createTask.remove();
            })

            checkbox.addEventListener("click", function() {
                label.classList.add("lineThrough");
            })
        }
}

addBtn.addEventListener("click", function(e) {
    taskText = taskInput.value.trim();
    if (taskText === "") {
        return;
    } 
    const tasksTable = {tache: taskText};
    tasks.push(tasksTable);
    const jsonString = JSON.stringify(tasks);
    localStorage.setItem("tache", jsonString);
    taskInput.value = "";
    render();
})

clearBtn.addEventListener("click", function(e){
 tasks.length = 0;
 localStorage.clear();
 let toBeRemoved = document.querySelectorAll(".toBeRemoved");
 for (let task of toBeRemoved) {
    task.remove();
 }
})



render();