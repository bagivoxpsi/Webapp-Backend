const btn_add = document.getElementById("add-button");
const popupExit = document.getElementById("popup-exit");
const btn_submit = document.getElementById("submit-btn");
const btn_cancel = document.getElementById("cancel-btn");
const popupContainer = document.getElementById("popup-container");
const addressInput = document.getElementById("address");
const addressList = document.getElementById("address-list");

const userId = Number(localStorage.getItem("userId"));

let editingAddress = null; // keeps track of which address is being edited
let user_addresses = [];

btn_add.addEventListener("click", () => openMenu());
popupExit.addEventListener("click", exitMenu);
btn_submit.addEventListener("click", submitAddress);
btn_cancel.addEventListener("click", exitMenu);

async function loadAddresses(userId) {
    try {
        // Fetch addresses (list) from CreateAddressServlet
        const response = await fetch(`/Webapp-Backend/getAddresses?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch addresses");	

		// The address list is returned as a json object
        const addresses = await response.json();
		
        user_addresses = addresses; 

        addressList.innerHTML = "";

        user_addresses.forEach(addr => addAddressToDOM(addr.address, addr.addressId));

    } catch (err) {
        console.error("Error loading addresses:", err);
    }
}


window.addEventListener("DOMContentLoaded", async () => {
	loadAddresses(userId);
});

// the submit address now directly interacts with the dao,
// much like the tasks implementation

async function submitAddress(event) {
    event.preventDefault();
    const addressText = addressInput.value.trim();
    if (!addressText) return;

	btn_submit.disabled = true;
	btn_submit.textContent = "Saving...";

	console.log({ userId, address: addressText });
	
	console.log("userId before fetch:", userId)
    try {
        if (editingAddress) {
            const addressId = editingAddress.dataset.id;
            const response = await fetch('/Webapp-Backend/editAddress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ addressId: addressId, address: addressText })
				// the edit servlet expects a json object with, {addressId : some integer, address: some string}
            });

            const result = await response.json();
            if (response.ok && result.status === 'success') {
				await loadAddresses(userId);
                editingAddress = null;
                exitMenu();
			}
		}
		
		else {
			// if not editing, add the address
            const response = await fetch('/Webapp-Backend/addAddress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, address: addressText })
            });

            const result = await response.json();
            if (response.ok && result.status === 'success') {
				await loadAddresses(userId);
                exitMenu();
			}
        }
    }
	 
	catch (err) {
        console.error(err);
    }
	
	finally {
	        btn_submit.disabled = false;
			btn_submit.textContent = editingAddress ? "Save Changes" : "Create";
    }
}

function addAddressToDOM(addressText, addressId) {
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

	cont.dataset.id = addressId;
	
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
    delBtn.addEventListener("click", () => deleteAddress(cont));

	if (user_addresses.length <= 1) {
	    delBtn.disabled = true;
	}
	
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
	addressInput.focus();
}

addressInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent line breaks
        submitAddress(event);
    } else if (event.key === "Escape") {
        event.preventDefault();
        exitMenu();
    }
});

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

async function deleteAddress(container) {
    const addressId = container.dataset.id; 
	// ^ the id of the container to delete ^
	// This should match the actual id in the database since the create function
	// assigns it accordingly

    try {
        const response = await fetch(`/Webapp-Backend/deleteAddress?addressId=${addressId}`, {
            method: 'POST'
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
			// reload the addresses to reflect the database after deletion
			await loadAddresses(userId);
        }
    } 
	
	catch (err) {
        console.error(err);
    }
}

