const btn = document.querySelector(".dropbtn");

btn.addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (!e.target.matches(".dropbtn")) {
    document.getElementById("myDropdown").classList.remove("show");
  }
});
