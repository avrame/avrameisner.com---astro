import * as DarkModeToggle from "dark-mode-toggle";

const toggle = document.querySelector("dark-mode-toggle");
const html = document.querySelector("html") as HTMLElement;

// Set or remove the `dark` class the first time.
toggle?.mode === "dark"
  ? html.classList.remove("dark")
  : html.classList.add("dark");

// Listen for toggle changes (which includes `prefers-color-scheme` changes)
// and toggle the `dark` class accordingly.
toggle?.addEventListener("colorschemechange", () => {
  html.classList.toggle("dark", toggle.mode !== "dark");
});
