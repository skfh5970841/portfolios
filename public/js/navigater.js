const navigater = document.querySelector(".navigater"),
  navigaterspan = document.querySelector(".navigaterspan");

function init() {
  console.log("navagater js init func");
  navigaterspan.innerHTML = `<a href="/login">Login</a>`;
}

init();
