const body = document.querySelector("body");
const addBtn = document.querySelector("#addBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const clearBtn = document.querySelector("#clearBtn");
let taskText;
const savedTask = localStorage.getItem("task");

// TASKS LIST
const tasks = savedTask ? JSON.parse(savedTask) : [];

const clearDOM = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
};

const counter = document.createElement("span");
counter.id = "counter";
body.append(counter);

const removeClearBtn = () => {
  if (tasks.length === 0) {
    clearBtn.classList.add("hide");
    counter.classList.add("hide");
  } else {
    clearBtn.classList.remove("hide");
    counter.classList.remove("hide");
  }
};

removeClearBtn();

const updateCounter = () => {
  let countingTasks = tasks.filter((task) => !task.done).length;

  if (countingTasks > 1) {
    counter.textContent = `There are ${countingTasks} remaining tasks.`;
  } else if (countingTasks === 0) {
    counter.textContent = `Congratulations, you completed all the tasks!`;
  } else {
    counter.textContent = `There is ${countingTasks} remaining task.`;
  }
};

const render = () => {
  clearDOM();

  for (let task of tasks) {
    let createTask = document.createElement("li");
    createTask.classList.add("toBeRemoved");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.checked = task.done || false;

    let label = document.createElement("label");
    label.textContent = task.task;

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
      localStorage.setItem("task", JSON.stringify(tasks));
      render();
      removeClearBtn();
    });

    checkbox.addEventListener("change", function () {
      task.done = checkbox.checked;
      label.classList.toggle("lineThrough", task.done);
      localStorage.setItem("task", JSON.stringify(tasks));
      updateCounter();
    });

    removeClearBtn();
  }
  updateCounter();
};

addBtn.addEventListener("click", function () {
  taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = { task: taskText, done: false };
  tasks.push(newTask);
  localStorage.setItem("task", JSON.stringify(tasks));
  taskInput.value = "";
  render();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    taskText = taskInput.value.trim();
    if (taskText === "") return;

    const newTask = { task: taskText, done: false };
    tasks.push(newTask);
    localStorage.setItem("task", JSON.stringify(tasks));
    taskInput.value = "";
    render();
  }
});

clearBtn.addEventListener("click", function () {
  tasks.splice(0, tasks.length);
  localStorage.clear();
  removeClearBtn();
  render();
});

removeClearBtn;
render();
