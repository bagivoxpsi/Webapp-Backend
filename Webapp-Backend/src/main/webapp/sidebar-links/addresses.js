const btn_add = document.getElementById("add-button");
const popupExit = document.getElementById("popup-exit");
const btn_submit = document.getElementById("submit-btn");
const btn_cancel = document.getElementById("cancel-btn");
const popupContainer = document.getElementById("popup-container");
const addressInput = document.getElementById("address");
const addressList = document.getElementById("address-list");

let editingAddress = null; // keeps track of which address is being edited
let dummy_addresses = [
    "3451, Tudor Rd",
    "700, Augusta Park",
    "3316, Red Dog Road",
    "1840, Washington Street"
];

btn_add.addEventListener("click", () => openMenu());
popupExit.addEventListener("click", exitMenu);
btn_submit.addEventListener("click", submitAddress);
btn_cancel.addEventListener("click", exitMenu);

// preload dummy addresses (the ones from the dropdown at the top)
window.addEventListener("DOMContentLoaded", () => {
    dummy_addresses.forEach(addr => addAddressToDOM(addr));
});

function submitAddress(event) {
    event.preventDefault();
    const addressText = addressInput.value.trim();
    if (!addressText) return;

    if (editingAddress) {
        // Update existing address
        editingAddress.querySelector(".address-text").innerText = addressText;
        editingAddress = null;
    } else {
        // Add new address
        addAddressToDOM(addressText);
    }

    exitMenu();
}

function addAddressToDOM(addressText) {
    const cont = document.createElement("div");
    cont.classList.add(
        "address-cont",
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
    text.classList.add("fw-semibold", "address-text");
    text.innerText = addressText;

    const actions = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "btn-outline-primary", "me-2");
    editBtn.innerHTML = '<i class="fa fa-pen"></i>';
    editBtn.addEventListener("click", () => editAddress(cont));

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "btn-outline-danger");
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    delBtn.addEventListener("click", () => cont.remove());

    actions.append(editBtn, delBtn);
    cont.append(text, actions);

    addressList.appendChild(cont);
}

function openMenu(isEditing = false) {
    popupContainer.style.display = "flex";
    if (isEditing) {
        document.getElementById("submit-btn").innerText = "Save Changes";
    } else {
        document.getElementById("submit-btn").innerText = "Create";
    }
}

function exitMenu() {
    popupContainer.style.display = "none";
    addressInput.value = "";
    editingAddress = null;
    document.getElementById("submit-btn").innerText = "Create";
}

function editAddress(container) {
    const currentText = container.querySelector(".address-text").innerText;
    addressInput.value = currentText;
    editingAddress = container;
    openMenu(true);
}
