// Selecting elements from the DOM & localStorage data
const body = document.querySelector("body");
const addBtn = document.querySelector("#addBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const clearBtn = document.querySelector("#clearBtn");
let taskText;
const savedTask = localStorage.getItem("task");

// Parsing the localStorage string to store it in an array
const tasks = savedTask ? JSON.parse(savedTask) : [];

// Corrects the behavior of the tasks list by preventing a task to be shown twice (instead of just once)
const clearDOM = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
};

// Creates a span text under the "clear all" button that shows the number of all pending tasks
const counter = document.createElement("span");
counter.id = "counter";
body.append(counter);

// If the tasks list is empty, hides the "clear all" button as well as the text with the pending tasks
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

// Creates a counter that counts all pending tasks
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

// MAIN FUNCTION
const render = () => {
  clearDOM();

  // Creation of the HTML elements of the tasks list
  for (let task of tasks) {
    let createTask = document.createElement("li");
    createTask.classList.add("toBeRemoved");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.checked = task.done || false;

    let label = document.createElement("p");
    label.textContent = task.task;
    label.classList.add("task__text");

    // UI feature: adding a cross icon as decoration for the remove button
    let createRemoveBtn = document.createElement("button");
    createRemoveBtn.classList.add("remove__button");

    let removeBtn = document.createElement("img");
    removeBtn.src = "../assets/img/remove.svg";

    // Appending the HTML elements in the tasks list
    createTask.append(checkbox);
    createTask.append(label);
    createTask.append(createRemoveBtn);
    createRemoveBtn.append(removeBtn);

    // When a task is checked, the task is either appended in the tasks list, or is removed from it
    if (task.done) {
      label.classList.add("lineThrough");
      taskList.appendChild(createTask);
    } else {
      taskList.prepend(createTask);
    }

    // We listen to the button that removes each task individually, and we clear elements from the DOM as well as the localStorage when the task is removed
    createRemoveBtn.addEventListener("click", function () {
      let currentTask = tasks.indexOf(task);
      tasks.splice(currentTask, 1);
      localStorage.setItem("task", JSON.stringify(tasks));
      // We call the render function again to make sure the HTML elements are removed, otherwise only the localStorage will be removed
      render();
      removeClearBtn();
    });

    // We listen to the checkbox, and if it is checked, we assign that the task is done to control the localStorage
    checkbox.addEventListener("change", function () {
      task.done = checkbox.checked;
      label.classList.toggle("lineThrough", task.done);
      localStorage.setItem("task", JSON.stringify(tasks));
      render();

      // We're couting the tasks again to update the text that indicates the pending tasks
      updateCounter();
    });

    removeClearBtn();
  }
  updateCounter();
};

// We listen to the "Add a task" button and we add a task to the list if the textarea is not empty
addBtn.addEventListener("click", function () {
  taskText = taskInput.value.trim();
  if (taskText === "") return;

  // We also save the task in the localStorage for data persistence
  const newTask = { task: taskText, done: false };
  tasks.push(newTask);
  localStorage.setItem("task", JSON.stringify(tasks));
  taskInput.value = "";
  render();
});

// if the user doesn't click on the "add a task" button, but enters the "enter" key, we return the same behavior
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

// We listen to the "clear all" button, and if clicked, we empty the tasks list in the DOM as well as the localStorage
clearBtn.addEventListener("click", function () {
  tasks.splice(0, tasks.length);
  localStorage.clear();
  removeClearBtn();
  render();
});

removeClearBtn;
render();
