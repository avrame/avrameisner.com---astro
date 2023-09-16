import * as DarkModeToggle from "dark-mode-toggle";

const toggle = document.querySelector("dark-mode-toggle");
const html = document.querySelector("html") as HTMLElement;

// Listen for toggle changes (which includes `prefers-color-scheme` changes)
// and toggle the `dark` class accordingly.
toggle?.addEventListener("colorschemechange", () => {
  html.classList.toggle("dark", toggle.mode === "dark");
});
