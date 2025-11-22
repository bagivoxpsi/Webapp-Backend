document.addEventListener("DOMContentLoaded", () => {
  // This JS File populates #upcoming-tasks with 3 tasks, will later be implemented with backend
  const upcomingTasks = [
    { name: "Turn off living room lights", time: "Today, 10:00 PM", icon: "fa-lightbulb" },
    { name: "Start coffee maker", time: "Tomorrow, 7:00 AM", icon: "fa-mug-saucer" },
    { name: "Lock all doors", time: "Tomorrow, 11:00 PM", icon: "fa-lock" },
  ];

  const container = document.getElementById("upcoming-tasks");

  if (upcomingTasks.length === 0) {
    container.innerHTML = `<div class="text-muted text-center py-3">No upcoming tasks</div>`;
    return;
  }

  upcomingTasks.forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.className =
      "list-group-item list-group-item-action d-flex justify-content-between align-items-center mt-3";
    taskItem.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="fa ${task.icon} me-3 task-icon"></i>
        <div>
          <div class="fw-semibold">${task.name}
        </div>
          <small>${task.time}</small>
      </div>
    `;
    container.appendChild(taskItem);
  });
});