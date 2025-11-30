class View {
  #container = document.querySelector(".extension_list");
  extension;
  constructor() {
    this._renderExtentions();
  }

  _extensionsData(URL) {
    return fetch(URL).then((res) => res.json());
  }

  _renderExtentions() {
    this._extensionsData("data.json")
      .then((data) => {
        data.forEach((dat) => {
          this.#container.insertAdjacentHTML("beforeend", this._markUp(dat));
        });
      })
      .then((ret) => (this.extension = document.querySelectorAll(".extension")))
      .catch((err) => {
        console.log(err);
      });
  }

  _markUp(data) {
    return `
    <div class="extension extension_light">
      <div class="extension__image-container">
        <img class="extension__image" src="${data.logo}" alt="${
      data.name
    } icon">
        <div>
          <h2 class="extension__title">${data.name}</h2>
          <p class="extension__description">${data.description}</p>
        </div>
      </div>
      <div class="extension__btn-container">
        <button class="remove__btn">Remove</button>
        <label class="toggle__switch">
          <input ${data.isActive ? "checked" : ""} type="checkbox">
          <span class="slider"></span>
        </label>
      </div>
    </div>`;
  }
}

export default new View();
