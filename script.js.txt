const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const formMsg = document.getElementById("formMsg");

if (year) year.textContent = new Date().getFullYear();

menuBtn?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

function fakeSubmit(e){
  e.preventDefault();
  if (formMsg) formMsg.textContent = "Thanks! This demo form is not connected yet. Tell me and I’ll add a real Azure Function form.";
  return false;
}
window.fakeSubmit = fakeSubmit;
