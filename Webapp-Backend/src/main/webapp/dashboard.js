// dashboard.js

document.addEventListener("DOMContentLoaded", function() {
  // Get the buttons by ID
  const lightsOffBtn = document.getElementById("lightsOffBtn");
  const awayModeBtn = document.getElementById("awayModeBtn");
  const thermostatBtn = document.getElementById("thermostatBtn");
  const lightStatusText = document.getElementById("lightStatusText");
  const lightIndicator = document.getElementById("lightIndicator");
  const thermostatStatus = document.getElementById("thermostatStatus");
  let lightsAreOff = false;
  let awayModeOn = false;


  // Adds a new activity to the list
function addActivity(iconClass, text) {
  const list = document.getElementById("activityList");
  if (!list) return;

  // Create a new activity item
  const item = document.createElement("div");
  item.className = "list-group-item d-flex justify-content-between align-items-center px-0";
  item.innerHTML = `
    <div><i class="${iconClass} me-2"></i>${text}</div>
    <small class="text-muted">Just now</small>
  `;

  // Add new item to the top
  list.prepend(item);

  // ✅ Limit to 3 items maximum
  while (list.children.length > 3) {
    list.removeChild(list.lastElementChild);
  }
}


  // All Lights Off
  lightsOffBtn.addEventListener("click", function() {
    lightsAreOff = !lightsAreOff; // toggle state

    if (lightsAreOff) {
      // Change button label
      lightsOffBtn.innerHTML = `<i class="fa fa-lightbulb me-2"></i>Set Lights On <span id="lightIndicator" class="light-indicator off ms-2"></span>`;
      // Update device status text
      lightStatusText.textContent = "Living Room Lights OFF";
      // Optional alert
      alert("💡 All lights have been turned off!");
    } else {
      // Restore button text
      lightsOffBtn.innerHTML = `<i class="fa fa-lightbulb me-2"></i>Set Lights Off <span id="lightIndicator" class="light-indicator ms-2"></span>`;
      // Update device status back
      lightStatusText.textContent = "Living Room Lights ON";
      alert("🔆 All lights have been turned on!");
    }

    addActivity("fa fa-lightbulb text-warning", lightsAreOff ? "Lights turned OFF" : "Lights turned ON");


  });

  // Set Away Mode
  awayModeBtn.addEventListener("click", function() {
  awayModeOn = !awayModeOn;

  const awayModeLabel = document.getElementById("awayModeLabel");

  if (awayModeOn) {
    awayModeLabel.textContent = "Away Mode Turned On";
    awayModeBtn.classList.add("btn-away-active");
    awayModeBtn.classList.remove("btn-outline-secondary");
    alert("🏠 Away Mode activated — doors locked and thermostat adjusted.");
    addActivity("fa fa-shield text-danger", "Away Mode activated");
  } else {
    awayModeLabel.textContent = "Set Away Mode";
    awayModeBtn.classList.remove("btn-away-active");
    awayModeBtn.classList.add("btn-outline-secondary");
    alert("🏡 Away Mode deactivated — normal mode resumed.");
    addActivity("fa fa-shield text-success", "Away Mode deactivated");
  }

  // optional UI update for security status
  document.getElementById("securityStatus").textContent = "All Secure";
});

  // Adjust Thermostat
  thermostatBtn.addEventListener("click", function() {
    const temp = prompt("🌡️ Set thermostat temperature (°F):", "72");
    if (temp) {
      // Update button label
      thermostatBtn.innerHTML = `<i class="fa fa-thermometer me-2"></i>Set to ${temp}°F`;

      // Update badge in Device Status
      thermostatStatus.textContent = `${temp}°F`;

      thermostatStatus.classList.add("flash");
      setTimeout(() => thermostatStatus.classList.remove("flash"), 600);


      // Optional feedback
      alert(`Thermostat adjusted to ${temp}°F`);
      if (temp) {
        addActivity("fa fa-thermometer text-info", `Thermostat set to ${temp}°F`);
      }

    }
  });

  

  //Chart.js Code
  const ctx = document.getElementById('energyBarChart').getContext('2d');
  let tickColorLight = "#333333";
  let tickColorDark = "#ffffff";
  let tickColor = tickColorLight;
  let darkmode = localStorage.getItem("darkmode");
  if(darkmode==="active"){
      tickColor=tickColorDark;
  }
  else{
      tickColor=tickColorLight;
  }
  new Chart(ctx, {
      type: 'bar',
      data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
          label: 'Energy (kWh)',
          data: [12, 14, 13, 15, 17, 14, 16],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 5
      }]
      },
      options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          y: {
          beginAtZero: true,
          ticks: {
              color: tickColor
          }
          },
          x: {
          ticks: {
              color: tickColor
          }
          }
      },
      plugins: {
          legend: {
          display: false
          }
      }
      }
  });
  
  
});





