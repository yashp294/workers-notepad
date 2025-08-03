// Theme toggle (single button)
const themeToggle = document.getElementById("themeToggle");
const root = document.body;

function setTheme(mode) {
  root.classList.toggle("dark", mode === "dark");
  localStorage.setItem("theme", mode);
}

themeToggle.onclick = () => {
  const isDark = root.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
};

window.onload = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") root.classList.add("dark");
};
