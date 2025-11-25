(() => {

const menu = document.getElementById("address-selector");
let user_addresses = [];

const userId = Number(localStorage.getItem("userId"));

window.addEventListener("pageshow", () => {
    loadAddresses(userId);
});

async function loadAddresses(userId) {
    try {
        // Fetch addresses (list) from CreateAddressServlet
        const response = await fetch(`/Webapp-Backend/getAddresses?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch addresses");

		// The address list is returned as a json object
        const addresses = await response.json();
		
        user_addresses = addresses; 

		menu.querySelectorAll('option:not([data-placeholder])').forEach(o => o.remove());
		
        user_addresses.forEach(addr => addAddressToMenu(addr.address));
		
		// Restore previously selected address from localStorage
		const savedAddress = localStorage.getItem("selectedAddress");
		if (savedAddress && user_addresses.some(a => a.address === savedAddress)) {
		    menu.value = savedAddress;
		} else if (user_addresses.length > 0) {
		    // fallback: select first address if nothing saved
		    menu.value = user_addresses[0].address;
		    localStorage.setItem("selectedAddress", user_addresses[0].address);
		}


    } catch (err) {
        console.error("Error loading addresses:", err);
    }
}

function addAddressToMenu(address) {
	const option = document.createElement("option");
	option.textContent = address;
	menu.appendChild(option);
}

// Save selected address when user changes dropdown
menu.addEventListener("change", () => {
    localStorage.setItem("selectedAddress", menu.value);
});

})();