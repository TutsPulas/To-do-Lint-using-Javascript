var taskList = document.getElementById("taskList");

// Load tasks from local storage when the page loads
window.addEventListener("load", function() {
  var savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
    addTaskControlsToExistingTasks();
  }
});

function addTask() {
  var taskInput = document.getElementById("taskInput");

  if (taskInput.value !== "") {
    var taskItem = document.createElement("li");
    taskItem.textContent = taskInput.value;
    taskList.appendChild(taskItem);
    addTaskControls(taskItem);
    taskInput.value = "";
    
    saveTasksToLocalStorage(); // Save tasks to local storage
  }
}

function addTaskControls(taskItem) {
  var editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", function() {
    editTask(taskItem);
  });
  taskItem.appendChild(editButton);

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", function() {
    deleteTask(taskItem);
    saveTasksToLocalStorage(); // Save tasks to local storage after deletion
  });
  taskItem.appendChild(deleteButton);
}

function editTask(taskItem) {
  var taskText = taskItem.textContent;
  taskItem.innerHTML = '';

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("edit-input");
  editInput.value = taskText;
  taskItem.appendChild(editInput);

  var saveButton = document.createElement("button");
  saveButton.innerHTML = '<i class="fas fa-check"></i>';
  saveButton.classList.add("edit-button");
  saveButton.addEventListener("click", function() {
    saveTask(taskItem, editInput.value);
    saveTasksToLocalStorage(); // Save tasks to local storage after editing
  });
  taskItem.appendChild(saveButton);
}

function saveTask(taskItem, newText) {
  taskItem.textContent = newText;
  addTaskControls(taskItem);
}

function deleteTask(taskItem) {
  taskList.removeChild(taskItem);
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Add task controls to existing tasks when the page loads
function addTaskControlsToExistingTasks() {
  var tasks = taskList.getElementsByTagName("li");
  for (var i = 0; i < tasks.length; i++) {
    addTaskControls(tasks[i]);
  }
}
