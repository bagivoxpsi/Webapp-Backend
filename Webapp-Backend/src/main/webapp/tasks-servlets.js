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
init();

btn_addTask.addEventListener("click",openMenu);
popupExit.addEventListener("click", exitMenu);
deviceMenu.addEventListener("change", loadProperties)
btn_submitTask.addEventListener("click",submitTask);
btn_cancelTask.addEventListener("click",exitMenu);

const userId = 1;

function loadTasks() {
	fetch(`/Webapp-Backend/getTasks?userId=${userId}`)
        .then(res => res.json())
        .then(tasks => {
            taskList.innerHTML = ""; // clear existing
            tasks.forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task-card", "p-2", "border", "rounded", "mb-2");

                const displayTime = formatTime12Hour(task.taskTime);
                const header = document.createElement("div");
                header.classList.add("fw-bold");
                header.textContent = `${task.device} at ${displayTime}`;
                taskDiv.appendChild(header);

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
                        colorBox.style.verticalAlign = "middle";
                        colorBox.style.border = "1px solid #000";
                        propLine.textContent = key + ": ";
                        propLine.appendChild(colorBox);
                    } else {
                        propLine.textContent = `${key}: ${value}`;
                    }
                    taskDiv.appendChild(propLine);
                }

                taskList.appendChild(taskDiv);
            });
        })
        .catch(err => console.error("Error loading tasks:", err));
}

document.addEventListener("DOMContentLoaded", loadTasks);

function submitTask(event) {
    event.preventDefault();

    const selectedDevice = deviceMenu.value;
    if (!selectedDevice) {
        alert("Please select a device first.");
        return;
    }

    const tasktimeInput = document.getElementById("task-time");
    const taskTime = tasktimeInput.value;

    // 1️⃣ Collect properties into an object
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

    // 2️⃣ Create taskInfo AFTER properties are collected
    const taskInfo = {
        userId: 1,  // hard-coded for now
        device: selectedDevice,
        properties: propertiesObj,
        taskTime: taskTime
    };

    // 3️⃣ Send taskInfo to backend
    fetch(`/Webapp-Backend/addTask?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskInfo)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Task added:", data);
        // Optionally update UI here
        exitMenu();
    })
    .catch(err => console.error("Error adding task:", err));

    // 4️⃣ Update UI locally
    console.log("Task submitted:", taskInfo);
    taskDetails.push(taskInfo);

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-card", "p-2", "border", "rounded", "mb-2");

    const displayTime = formatTime12Hour(taskInfo.taskTime);
    const header = document.createElement("div");
    header.classList.add("fw-bold");
    header.textContent = `${taskInfo.device} at ${displayTime}`;
    taskDiv.appendChild(header);

    for (const [key, value] of Object.entries(taskInfo.properties)) {
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

    taskList.appendChild(taskDiv);
    exitMenu();
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