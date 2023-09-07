import * as DarkModeToggle from "dark-mode-toggle";

const toggle = document.querySelector("dark-mode-toggle");
const body = document.body;

// Set or remove the `dark` class the first time.
toggle?.mode === "dark"
  ? body.classList.remove("dark")
  : body.classList.add("dark");

// Listen for toggle changes (which includes `prefers-color-scheme` changes)
// and toggle the `dark` class accordingly.
toggle?.addEventListener("colorschemechange", () => {
  body.classList.toggle("dark", toggle.mode !== "dark");
});
