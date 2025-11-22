// Predefined permissions (programmer-defined)
const permissions = [
  { name: "Control Lights", enabled: true },
  { name: "View Security Cameras", enabled: false },
  { name: "Unlock Doors", enabled: false },
  { name: "Adjust Thermostat", enabled: true },
  { name: "View Energy Usage", enabled: true },
  { name: "Manage Devices", enabled: false },
  { name: "Add Other Guests", enabled: false }
];

window.addEventListener("DOMContentLoaded", () => {
  const permissionsList = document.getElementById("permissions");
  if (!permissionsList) return;

  // "toggle all" button container
  const toggleAllContainer = document.createElement("div");
  toggleAllContainer.classList.add(
    "d-flex",
    "justify-content-center",
    "mb-3"
  );

  // "toggle all" button element and styling classes
  const toggleAllBtn = document.createElement("button");
  toggleAllBtn.classList.add("btn", "btn-outline-primary");
  toggleAllBtn.innerHTML = '<i class="fa fa-toggle-on me-1"></i>';

  toggleAllContainer.appendChild(toggleAllBtn);
  permissionsList.parentElement.insertBefore(toggleAllContainer, permissionsList);

  // === Populate permissions list ===
  permissions.forEach((perm, index) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-0",
      "px-0",
      "py-2"
    );

    const label = document.createElement("span");
    label.innerText = perm.name;
    label.classList.add("fw-semibold");

    const toggleWrapper = document.createElement("div");
    toggleWrapper.classList.add("form-check", "form-switch", "m-0");

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.classList.add("form-check-input", "perm-toggle");
    toggle.id = `perm-${index}`;
    toggle.checked = perm.enabled;

    toggle.addEventListener("change", () => {
      console.log(`${perm.name}: ${toggle.checked ? "Enabled" : "Disabled"}`);
      perm.enabled = toggle.checked; // update internal state
    });

    toggleWrapper.appendChild(toggle);
    li.append(label, toggleWrapper);
    permissionsList.appendChild(li);
  });

  // === Toggle All logic ===
  let allEnabled = permissions.every(p => p.enabled);

  const updateToggleAllButton = () => {
    toggleAllBtn.innerHTML = allEnabled
      ? '<i class="fa fa-toggle-off me-1"></i>Disable All'
      : '<i class="fa fa-toggle-on me-1"></i>Enable All';
  };

  updateToggleAllButton();

  toggleAllBtn.addEventListener("click", () => {
    allEnabled = !allEnabled;
    permissions.forEach((perm, i) => {
      perm.enabled = allEnabled;
      document.getElementById(`perm-${i}`).checked = allEnabled;
    });
    updateToggleAllButton();
    console.log(`All permissions ${allEnabled ? "enabled" : "disabled"}`);
  });
});
