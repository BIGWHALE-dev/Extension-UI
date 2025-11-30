import view from "./view.js";
const body = document.querySelector("body");
const header = body.querySelector(".header");
const logo = header.querySelector(".logo img");
const fillterBtnContainer = document.querySelector(".filters__states");
const fillterBtn = body.querySelectorAll(".filter_btn");
const extensionContainer = body.querySelector(".extension_list");

////////////////////////////////////////////////////

//
// Theme settings
const themeBtn = document.querySelector(".theme__settings");
const themeImg = themeBtn.querySelector("img");
let thereBeLight = true;

themeBtn.addEventListener("click", function () {
  if (thereBeLight) {
    themeImg.setAttribute("src", "./assets/images/icon-sun.svg");
    body.classList.add("dark");
    logo.setAttribute("src", "./assets/images/logo-dark.svg");
    //
  } else {
    themeImg.setAttribute("src", "./assets/images/icon-moon.svg");
    body.classList.remove("dark");
    logo.setAttribute("src", "./assets/images/logo.svg");
  }
  thereBeLight = !thereBeLight;
});

///////////////////////////////////////////////////////
// ===== fillter buttons state and actions ======
let clicked;

const filterActive = async function () {
  if (clicked.classList.contains("active")) {
    await view.extension.forEach((active) => {
      if (active.querySelector("input:checked")) active.style.display = "";
      else active.style.display = "none";
    });
  }
};

const filterInActive = async function () {
  if (clicked.classList.contains("inactive")) {
    await view.extension.forEach((inactive) => {
      if (!inactive.querySelector("input:checked")) inactive.style.display = "";
      else inactive.style.display = "none";
    });
  }
};

fillterBtnContainer.addEventListener("click", async function (e) {
  clicked = e.target;
  if (!clicked.classList.contains("filter_btn")) return;
  // remove all clicked
  fillterBtn.forEach((b) => {
    b.classList.remove("filter_btn-clicked");
  });

  // add classlist to the clicked
  clicked.classList.add("filter_btn-clicked");

  // Actions
  if (clicked.classList.contains("all")) {
    await view.extension.forEach((all) => (all.style.display = ""));
  }
  filterActive();
  filterInActive();
});

/////////////////////////////////////////////////////////////
// ====== toggle-switch: when in active and inactive =======

const activeBtn = document.querySelector(".active");
const inactiveBtn = document.querySelector(".inactive");

extensionContainer.addEventListener("change", function (e) {
  const toggle = e.target;
  const toggleExten = toggle.closest(".extension");
  if (toggle.type === "checkbox") {
    if (activeBtn.classList.contains("filter_btn-clicked")) {
      if (toggle.checked) toggleExten.style.display = "";
      else toggleExten.style.display = "none";
    } else if (inactiveBtn.classList.contains("filter_btn-clicked")) {
      if (toggle.checked) toggleExten.style.display = "none";
      else toggleExten.style.display = "";
    }
  }
});
////////////////////////////////////////////////////////////
// Remove buttons action
extensionContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("extension_remove")) {
    const remove = e.target;
    remove.closest(".extension").remove();
  }
});
