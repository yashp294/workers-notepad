const apiURL = "https://script.google.com/macros/s/AKfycbz2Y6GIJWlUFL8wAiuYkzgXpyQfXjTV27POzTU3oEHN8rMen8csyodU-VCcSvnyS03HMA/exec";

let notes = [];
let currentNoteId = null;

const titleEl = document.getElementById("noteTitle");
const contentEl = document.getElementById("noteContent");
const listEl = document.getElementById("noteList");
const newNoteBtn = document.getElementById("newNote");
const themeToggle = document.getElementById("themeToggle");

// 🌗 Theme Toggle
themeToggle.onclick = () => {
  document.documentElement.toggleAttribute("data-theme", "dark");
};

// 🔁 Auto-load notes
window.onload = async () => {
  const res = await fetch(apiURL);
  notes = await res.json();
  renderList();
};

// 📋 Render note list
function renderList() {
  listEl.innerHTML = "";
  notes.forEach((n) => {
    const li = document.createElement("li");
    li.textContent = n.title || "Untitled";
    if (n.id === currentNoteId) li.classList.add("active");
    li.onclick = () => openNote(n.id);
    listEl.appendChild(li);
  });
}

// 📖 Open a note
function openNote(id) {
  const note = notes.find((n) => n.id === id);
  if (!note) return;
  currentNoteId = id;
  titleEl.value = note.title;
  contentEl.value = note.content;
  renderList();
}

// ➕ New note
newNoteBtn.onclick = () => {
  const id = Date.now().toString();
  const note = { id, title: "", content: "" };
  notes.push(note);
  currentNoteId = id;
  titleEl.value = "";
  contentEl.value = "";
  renderList();
};

// 💾 Auto-save
function saveNote() {
  const note = notes.find((n) => n.id === currentNoteId);
  if (!note) return;

  note.title = titleEl.value;
  note.content = contentEl.value;

  fetch(apiURL, {
    method: "POST",
    body: JSON.stringify(note),
  }).catch(console.error);
}

// Auto-save delay
let saveTimeout;
[titleEl, contentEl].forEach((el) =>
  el.addEventListener("input", () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveNote, 1000);
  })
);
