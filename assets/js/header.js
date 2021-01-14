const navToggleBtn = document.querySelector(".responsiveMenu");
const nav = document.querySelector(".nav");
const main = document.querySelector("main");

const toggleMenu = () => {
  nav.classList.toggle("activatedMenu");
};

const removeActivatedMenu = () => {
  nav.classList.remove("activatedMenu");
};

const checkActivated = () => {
  const activated = document.querySelector(".activatedMenu");
  if (activated) {
    removeActivatedMenu();
  }
};

if (nav) {
  const links = nav.querySelectorAll("a");
  links.forEach((link) => link.addEventListener("click", removeActivatedMenu));
}

main.addEventListener("click", checkActivated);

navToggleBtn.addEventListener("click", toggleMenu);
