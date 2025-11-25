const btn_addTask = document.getElementById("add-task-button");
const taskDetails = [];
const deviceList = ["Light","Thermostat","Speaker"];
const taskContainer = document.getElementById("task-container");
const pageContent = document.getElementById("page-content-tasks"); // <-- it's just the body
const popupExit = document.getElementById("popup-exit");
const popupContainer = document.getElementById("popup-container");
const deviceMenu = document.getElementById("device-selector");
const taskPopUp = document.getElementById("task-popup");
const deviceProperties = document.getElementById("device-properties");
const btn_submitTask = document.getElementById("submit-task");
const btn_cancelTask = document.getElementById("cancel-task");
const taskList = document.getElementById("task-list");
let darkmode = localStorage.getItem("darkmode");

let selectedDevice = null;

let selectMode = false;
const selectedTasks = new Set(); // will store selected task IDs

const userId = Number(localStorage.getItem("userId"));

init();

btn_addTask.addEventListener("click",openMenu);
popupExit.addEventListener("click", exitMenu);
deviceMenu.addEventListener("change", loadProperties)
btn_submitTask.addEventListener("click",submitTask);
btn_cancelTask.addEventListener("click",exitMenu);
document.addEventListener("DOMContentLoaded", loadTasks);

const btnSelectTasks = document.getElementById("select-tasks-button");

btnSelectTasks.addEventListener("click", () => {
    selectMode = !selectMode;

    if (selectMode) {
        btnSelectTasks.textContent = "Exit Select Mode";
        // Make all cards selectable
        document.querySelectorAll(".task-card").forEach(card => {
            card.classList.add("selectable");
        });
    } else {
        btnSelectTasks.textContent = "Select Tasks";
        selectedTasks.clear();
        document.querySelectorAll(".task-card").forEach(card => {
            card.classList.remove("selectable", "selected");
        });
        updateDeleteButton(); // hide delete button if nothing selected
    }
});



const btnDeleteSelected = document.getElementById("delete-selected-button");

btnDeleteSelected.addEventListener("click", () => {
    if (selectedTasks.size === 0) {
        alert("No tasks selected!");
        return;
    }

    if (!confirm("Are you sure you want to delete the selected tasks?")) return;

    const tasksToDelete = Array.from(selectedTasks);

    Promise.all(tasksToDelete.map(taskId =>
        fetch(`/Webapp-Backend/deleteTask?taskId=${taskId}`, { method: "POST" })
    ))
    .then(() => {
        selectedTasks.clear();
        updateDeleteButton();
        loadTasks(); // refresh list and hide Select Tasks button if empty
    })
    .catch(err => console.error("Error deleting tasks:", err));
});

function loadTasks() {
	fetch(`/Webapp-Backend/getTasks?userId=${userId}`)
        .then(res => res.json())
        .then(tasks => {
            taskList.innerHTML = ""; // clear existing
            tasks.forEach(task => {
				const taskDiv = createTaskCard(task);
				taskList.appendChild(taskDiv);
			});
			
			if (tasks.length > 0) {
			    btnSelectTasks.classList.remove("d-none");
			} else {
			    btnSelectTasks.classList.add("d-none");
			}
        })
        .catch(err => console.error("Error loading tasks:", err));
}


function submitTask(event) {
    event.preventDefault();

    const selectedDevice = deviceMenu.value;
    if (!selectedDevice) {
        alert("Please select a device first.");
        return;
    }

    const tasktimeInput = document.getElementById("task-time");
    const taskTime = tasktimeInput.value;

    // Build the properties object
    const propertiesObj = {};
    const rows = deviceProperties.querySelectorAll(".row");
    rows.forEach(row => {
        const name = row.querySelector(".col-6:first-child").textContent;
        const input = row.querySelector("input, select");
        if (!input) return;

        let value;
        if (input.type === "checkbox") {
            value = input.checked ? "On" : "Off";
        } else {
            value = input.value;
        }

        propertiesObj[name] = value;
    });

    // Build the task object
    const taskInfo = {
        userId: userId,
        device: selectedDevice,
        properties: propertiesObj,
        taskTime: taskTime
    };

    // Send to backend
    fetch(`/Webapp-Backend/addTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskInfo)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Task added:", data);
        exitMenu();
        // Refresh the task list to include the new task
        loadTasks();
    })
    .catch(err => console.error("Error adding task:", err));

    // Clear local form/UI state
    exitMenu();
}

function deleteTask(taskId) {
    fetch(`/Webapp-Backend/deleteTask?taskId=${taskId}`, { method: "POST" })
        .then(res => res.json())
        .then(data => {
            console.log("Delete response:", data);
            // refresh the task list (this will update the Select Tasks button)
            loadTasks();
            selectedTasks.clear();
            updateDeleteButton();
        })
        .catch(err => console.error("Error deleting task:", err));
}



// Everything below is old code mostly for formatting and styling purposes 

// hides delete button if no tasks selected
function updateDeleteButton() {
    if (selectedTasks.size > 0) {
        btnDeleteSelected.classList.remove("d-none");
    } else {
        btnDeleteSelected.classList.add("d-none");
    }
}

// CREATES THE TASK HTML CARDS
function createTaskCard(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-card", "p-2", "rounded", "mb-2");
    taskDiv.dataset.taskId = task.taskId;

    // Header: Device + Time
    const displayTime = formatTime12Hour(task.taskTime);
    const header = document.createElement("div");
    header.classList.add("fw-bold");
    header.textContent = `${task.device} at ${displayTime}`;
    taskDiv.appendChild(header);

    // Properties
    for (const [key, value] of Object.entries(task.properties)) {
        if (!value) continue;
        const propLine = document.createElement("div");

        if (key.toLowerCase().includes("color")) {
            const colorBox = document.createElement("span");
            colorBox.style.display = "inline-block";
            colorBox.style.width = "16px";
            colorBox.style.height = "16px";
            colorBox.style.backgroundColor = value;
            colorBox.style.marginLeft = "8px";
            colorBox.style.border = "1px solid #000";

            propLine.textContent = key + ": ";
            propLine.appendChild(colorBox);
        } else {
            propLine.textContent = `${key}: ${value}`;
        }

        taskDiv.appendChild(propLine);
    }

    // Individual Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "mt-2");
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent triggering select mode
        deleteTask(task.taskId);
    });
    taskDiv.appendChild(deleteBtn);

    // Click handler for Select Mode
	taskDiv.addEventListener("click", () => {
	    if (!selectMode) return;

	    const taskId = task.taskId;

	    if (selectedTasks.has(taskId)) {
	        selectedTasks.delete(taskId);
	        taskDiv.classList.remove("selected");
	    } else {
	        selectedTasks.add(taskId);
	        taskDiv.classList.add("selected");
	    }

	    updateDeleteButton();
	});
	
    return taskDiv;
}

function formatTime12Hour(time24) {
    if (!time24) return "";
    let [hours, minutes] = time24.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12; // 0 => 12 AM
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function init(){
    for (device of deviceList){
        const option = document.createElement("option");
        option.innerHTML = device;
        deviceMenu.appendChild(option);
    }
}

function openMenu() {
    // create popup
    popupContainer.style.display = "flex";
}

function exitMenu() {
    popupContainer.style.display = "none";
    deviceMenu.value = "";
    deviceProperties.innerHTML = "";
}

function getPropertiesFromDevice(device) {
    let properties = [];
    switch(device){
        case "Light":
            properties = ["Power","Brightness","Color"];
            break;
        case "Thermostat":
            properties = ["Power","Temperature"];
            break;
        case "Speaker":
            properties = ["Power","Volume","Track"];
            break;
        default:
            break;
    }
    return properties;
}

function loadProperties() {
    const selected = deviceMenu.value;
    if(!selected) return;
    
    deviceProperties.innerHTML = "";

    const properties = getPropertiesFromDevice(selected);

    for (const property of properties) {
        const row = document.createElement("div");
        row.classList.add("row");
        deviceProperties.appendChild(row);

        const name = document.createElement("div");
        name.classList.add("col-6");
        name.textContent = property;
        row.appendChild(name);

        const value = document.createElement("div");
        value.classList.add("col-6");
        const input = createInputFor(property);
        value.appendChild(input);
        row.appendChild(value);
    }
}

function createInputFor(propertyName){
  const lower = propertyName.toLowerCase();

  // state property for any device represented as a switch
  if (lower.includes("power")) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("form-check", "form-switch");
    wrapper.classList.add("d-flex", "justify-content-center", "align-items-center");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("form-check-input");
    input.role = "switch";
    input.id = `toggle-${propertyName}`;

    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.setAttribute("for", input.id);

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    return wrapper;
  }

  // input type based on what is in the "property" string
  const input = document.createElement("input");

  if (lower.includes("brightness") || lower.includes("volume")) {
    input.type = "range";
    input.min = 0;
    input.max = 100;

  } else if (lower.includes("temperature")) {
    input.type = "number";
    input.min = 10;
    input.max = 30;
    
  } else if (lower.includes("color")) {
    input.type = "color";

  } else {
    input.type = "text";
  }

  return input;    
}