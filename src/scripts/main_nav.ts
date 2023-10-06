const main_nav = document.getElementById("main_nav");
const open_nav_btn = document.getElementById("open_nav_btn");
const close_nav_btn = document.getElementById("close_nav_btn");

open_nav_btn?.addEventListener("click", () => {
  main_nav?.classList.remove("-translate-x-full");
}, { passive: true });

close_nav_btn?.addEventListener("click", () => {
  main_nav?.classList.add("-translate-x-full");
}, { passive: true });
