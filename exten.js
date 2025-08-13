const body = document.querySelector("body");
const header = body.querySelector(".header");
const logo = header.querySelector(".logo img");
const fillterBtnContainer = document.querySelector(".filters__states");
const fillterBtn = body.querySelectorAll(".filter_btn");
const filterBtnClicked = document.querySelector(".filter_btn-clicked");
const extensionContainer = body.querySelector(".extension_list");
const extension = body.querySelectorAll(".extension");
const extensionBtn = body.querySelectorAll(".extension_remove");
const toggleBtnSlider = body.querySelectorAll(".slider");

////////////////////////////////////////////////////
// Re-usable functions

// To add dark theme
const themeLoopAdd = function (query, oldClass, newClass) {
  query.forEach((ext) => {
    ext.classList.replace(oldClass, newClass);
  });
};

const btnColorDark = function (c) {
  c.classList.replace("filter_btn-dark", "filter_btn-clicked-dark");
};

// To Remove Dark Theme
const themeLoopRemove = function (query, oldClass, newClass) {
  query.forEach((ext) => {
    ext.classList.replace(oldClass, newClass);
  });
};

const btnColorDarkRemove = function () {
  fillterBtn.forEach((b) => {
    b.classList.replace("filter_btn-clicked-dark", "filter_btn-dark");
  });
};

//

///////////////////////////////////////////////////////////
// Theme settings
const themeBtn = document.querySelector(".theme__settings");
const themeImg = themeBtn.querySelector("img");

themeBtn.addEventListener("click", function () {
  if (themeImg.src.includes("moon")) {
    themeImg.setAttribute("src", "./assets/images/icon-sun.svg");
    themeBtn.classList.add("theme__settins-dark");
    body.classList.replace("body_light", "moon");
    header.classList.replace("header__light", "header__dark");
    logo.setAttribute("src", "./assets/images/logo-dark.png");
    themeLoopAdd(extension, "extension_light", "extension__moon");
    toggleBtnSlider.forEach((tgs) => {
      tgs.classList.add("dark");
    });
    themeLoopAdd(fillterBtn, "filter_btn-light", "filter_btn-dark");

    fillterBtn.forEach((b) => {
      if (b.classList.contains("filter_btn-clicked"))
        b.classList.replace("filter_btn-clicked", "filter_btn-clicked-dark");
    });
    //
  } else {
    themeImg.setAttribute("src", "./assets/images/icon-moon.svg");
    themeBtn.classList.remove("theme__settins-dark");
    body.classList.replace("moon", "body_light");
    header.classList.replace("header__dark", "header__light");
    logo.setAttribute("src", "./assets/images/logo.svg");
    themeLoopRemove(extension, "extension__moon", "extension_light");
    toggleBtnSlider.forEach((tgs) => {
      tgs.classList.remove("dark");
    });
    themeLoopRemove(fillterBtn, "filter_btn-dark", "filter_btn-light");

    fillterBtn.forEach((b) => {
      if (b.classList.contains("filter_btn-clicked-dark")) {
        b.classList.replace("filter_btn-clicked-dark", "filter_btn-clicked");
      }
    });
  }
});

///////////////////////////////////////////////////////
// ===== fillter buttons state and actions ======
let clicked;

const filterActive = function () {
  if (clicked.classList.contains("active")) {
    extension.forEach((active) => {
      if (active.querySelector("input:checked")) active.style.display = "";
      else active.style.display = "none";
    });
  }
};

const filterInActive = function () {
  if (clicked.classList.contains("inactive")) {
    extension.forEach((inactive) => {
      if (!inactive.querySelector("input:checked")) inactive.style.display = "";
      else inactive.style.display = "none";
    });
  }
};

fillterBtnContainer.addEventListener("click", function (e) {
  clicked = e.target;
  if (!clicked.classList.contains("filter_btn")) return;
  // remove all clicked
  fillterBtn.forEach((b) => {
    b.classList.replace("filter_btn-clicked", "filter_btn-light");
  });
  if (clicked.classList.contains("filter_btn-dark")) btnColorDarkRemove();

  // add classlist to the clicked
  clicked.classList.replace("filter_btn-light", "filter_btn-clicked");
  if (clicked.classList.contains("filter_btn-dark")) btnColorDark(clicked);

  // Actions
  if (clicked.classList.contains("all")) {
    extension.forEach((all) => (all.style.display = ""));
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
    if (
      activeBtn.classList.contains("filter_btn-clicked") ||
      activeBtn.classList.contains("filter_btn-clicked-dark")
    ) {
      if (toggle.checked) toggleExten.style.display = "";
      else toggleExten.style.display = "none";
    } else if (
      inactiveBtn.classList.contains("filter_btn-clicked") ||
      inactiveBtn.classList.contains("filter_btn-clicked-dark")
    ) {
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
