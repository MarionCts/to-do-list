const addBtn = document.querySelector("#addBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const clearBtn = document.querySelector("#clearBtn");
let taskText;
const savedTask = localStorage.getItem("tache");

// Liste des tâches
const tasks = savedTask ? JSON.parse(savedTask) : [];

const nettoyerDOM = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
};

const removeClearBtn = () => {
  if (tasks.length === 0) {
    clearBtn.classList.add("hide");
  } else {
    clearBtn.classList.remove("hide");
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
    checkbox.checked = task.done || false;

    let label = document.createElement("label");
    label.textContent = task.tache;

    if (task.done) {
      label.classList.add("lineThrough");
    }

    let createRemoveBtn = document.createElement("button");
    let removeBtn = document.createElement("img");
    removeBtn.src = "img/remove.svg";

    taskList.append(createTask);
    createTask.append(checkbox);
    createTask.append(label);
    createTask.append(createRemoveBtn);
    createRemoveBtn.append(removeBtn);

    createRemoveBtn.addEventListener("click", function () {
      let currentTask = tasks.indexOf(task);
      tasks.splice(currentTask, 1);
      localStorage.setItem("tache", JSON.stringify(tasks));
      render();
      removeClearBtn();
    });

    checkbox.addEventListener("change", function () {
      task.done = checkbox.checked;
      label.classList.toggle("lineThrough", task.done);
      localStorage.setItem("tache", JSON.stringify(tasks));
    });
  }

  removeClearBtn();
};

addBtn.addEventListener("click", function () {
  taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = { tache: taskText, done: false };
  tasks.push(newTask);
  localStorage.setItem("tache", JSON.stringify(tasks));
  taskInput.value = "";
  render();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        taskText = taskInput.value.trim();
        if (taskText === "") return;

        const newTask = { tache: taskText, done: false };
        tasks.push(newTask);
        localStorage.setItem("tache", JSON.stringify(tasks));
        taskInput.value = "";
        render();
    }
});

clearBtn.addEventListener("click", function () {
  tasks.length = 0;
  localStorage.clear();
  render();
});

render();
