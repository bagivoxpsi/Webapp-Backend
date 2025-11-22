const btn_add = document.getElementById("add-button");
const popupExit = document.getElementById("popup-exit");
const btn_submit = document.getElementById("submit-btn");
const btn_cancel = document.getElementById("cancel-btn");
const popupContainer = document.getElementById("popup-container");
const guestInput = document.getElementById("guest");
const guestList = document.getElementById("guests");

let editingGuest = null; // to track of which guest is being edited

// Event listeners
btn_add.addEventListener("click", () => openMenu());
popupExit.addEventListener("click", exitMenu);
btn_submit.addEventListener("click", submitGuest);
btn_cancel.addEventListener("click", exitMenu);

// loads dummy data on page load, much like the addresses page
const dummy_guests = [
    "john.doe@email.com",
    "sarah.lee@email.com",
    "michael.smith@email.com",
    "emily.jones@email.com"
];

window.addEventListener("DOMContentLoaded", () => {
    dummy_guests.forEach(g => addGuestToDOM(g));
});

// Submit or edit guest
function submitGuest(event) {
    event.preventDefault();
    const guestText = guestInput.value.trim();
    if (!guestText) return;

    if (editingGuest) {
        // Update existing guest
        editingGuest.querySelector(".guest-text").innerText = guestText;
        editingGuest = null;
    } else {
        // Add new guest
        addGuestToDOM(guestText);
    }

    exitMenu();
}

// Add guest to DOM
function addGuestToDOM(guestText) {
    const cont = document.createElement("div");
    cont.classList.add(
        "guest-cont",
        "border",
        "rounded",
        "p-3",
        "my-2",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "shadow-sm"
    );

    const text = document.createElement("span");
    text.classList.add("fw-semibold", "guest-text");
    text.innerText = guestText;

    const actions = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "btn-outline-primary", "me-2");
    editBtn.innerHTML = '<i class="fa fa-pen"></i>';
    editBtn.addEventListener("click", () => editGuest(cont));

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "btn-outline-danger");
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    delBtn.addEventListener("click", () => cont.remove());

    actions.append(editBtn, delBtn);
    cont.append(text, actions);

    guestList.appendChild(cont);
}

// Popup control
function openMenu(isEditing = false) {
    popupContainer.style.display = "flex";
    document.getElementById("submit-btn").innerText = isEditing ? "Save Changes" : "Create";
}

function exitMenu() {
    popupContainer.style.display = "none";
    guestInput.value = "";
    editingGuest = null;
    document.getElementById("submit-btn").innerText = "Create";
}

// Edit guest
function editGuest(container) {
    const currentText = container.querySelector(".guest-text").innerText;
    guestInput.value = currentText;
    editingGuest = container;
    openMenu(true);
}

// TODO:
// include scroll-to-top and scroll-to-bottom button
// for mobile users to prevent having to scroll large
// distances to permissions when a large number of 
// guests is added