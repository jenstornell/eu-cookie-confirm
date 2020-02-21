class euCookieConfirm {
  constructor(options) {
    this.thisOptions(options);

    this.eventCancel();
    this.eventAccept();

    if (!this.isHidden()) {
      this.show();
    }
  }

  script(script) {
    this.userScript = script;

    if (this.isHidden() && this.getStore() === "true") {
      script();
    }
  }

  eventAccept() {
    document
      .querySelector(this.o.selectorAccept)
      .addEventListener("click", () => {
        this.userScript();
        this.hide();
        this.setStore("true");
      });
  }

  eventCancel() {
    document
      .querySelector(this.o.selectorClose)
      .addEventListener("click", () => {
        this.hide();
        this.setStore("false");
      });
  }

  show() {
    document.querySelector(this.o.selectorMessage).removeAttribute("hidden");
  }

  hide() {
    document.querySelector(this.o.selectorMessage).setAttribute("hidden", "");
  }

  setStore(value) {
    localStorage.setItem(this.o.localStorageName, value);
  }

  getStore() {
    return localStorage.getItem(this.o.localStorageName);
  }

  isHidden() {
    return localStorage.hasOwnProperty(this.o.localStorageName);
  }

  defaults() {
    return {
      localStorageName: "eu-cookie-confirm",
      selectorAccept: "[data-accept]",
      selectorClose: "[data-cancel]",
      selectorMessage: "#ecc"
    };
  }

  thisOptions(options) {
    this.o = Object.assign(this.defaults(), options);
  }
}
