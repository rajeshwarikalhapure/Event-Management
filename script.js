let events = JSON.parse(localStorage.getItem("events")) || [];

const eventForm = document.getElementById("eventForm");
const eventTableBody = document.getElementById("eventTableBody");
const resetBtn = document.getElementById("resetBtn");

// Save Event (Add / Edit)
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("eventId").value;
  const name = document.getElementById("eventName").value.trim();
  const date = document.getElementById("eventDate").value;
  const location = document.getElementById("eventLocation").value.trim();
  const description = document.getElementById("eventDescription").value.trim();

  // Validation
  if (!name || !date || !location || !description) {
    alert("Please fill all fields!");
    return;
  }

  if (id) {
    // Edit
    const index = events.findIndex(ev => ev.id === id);
    events[index] = { id, name, date, location, description };
  } else {
    // Add new
    const newEvent = {
      id: Date.now().toString(),
      name,
      date,
      location,
      description
    };
    events.push(newEvent);
  }

  localStorage.setItem("events", JSON.stringify(events));
  renderEvents();
  eventForm.reset();
  document.getElementById("eventId").value = "";
});

// Reset form
resetBtn.addEventListener("click", () => {
  document.getElementById("eventId").value = "";
});

// Render Events in Table
function renderEvents() {
  eventTableBody.innerHTML = "";
  events.forEach((ev, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${ev.name}</td>
        <td>${ev.date}</td>
        <td>${ev.location}</td>
        <td>${ev.description}</td>
        <td>
          <button class="edit" onclick="editEvent('${ev.id}')">Edit</button>
          <button class="delete" onclick="deleteEvent('${ev.id}')">Delete</button>
        </td>
      </tr>
    `;
    eventTableBody.innerHTML += row;
  });
}

// Edit Event
function editEvent(id) {
  const ev = events.find(ev => ev.id === id);
  document.getElementById("eventId").value = ev.id;
  document.getElementById("eventName").value = ev.name;
  document.getElementById("eventDate").value = ev.date;
  document.getElementById("eventLocation").value = ev.location;
  document.getElementById("eventDescription").value = ev.description;
}

// Delete Event
function deleteEvent(id) {
  if (confirm("Are you sure you want to delete this event?")) {
    events = events.filter(ev => ev.id !== id);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents();
  }
}

// Initial Load
renderEvents();
