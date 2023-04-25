(() => {
  // DOM Elements
  const menuButton = document.getElementById("menu-button");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownWrapper = document.querySelector("#dropdown-wrapper");
  const headerEffect1 = document.querySelector(".header-effect");
  const headerEffect2 = document.querySelector(".container-header");



  // Functions
  function redrawElement(element) {
    const display = element.style.display;
    element.style.display = "none";
    void element.offsetWidth; // Trigger a reflow, flushing the CSS changes
    element.style.display = display;
  }

  function isMessengerAppInstalled() {
    if (typeof FB !== "undefined" && FB !== null) {
      FB.getDeferredLoadState().then((result) => {
        if (result === "READY") {
          openMessengerInApp();
        } else {
          window.open("https://m.me/274598629331502", "_blank");
        }
      });
    } else {
      window.open("https://m.me/274598629331502", "_blank");
    }
  }

  function openMessengerInApp() {
    window.location.href = "fb-messenger://user-thread/274598629331502";
  }

  // Event Listeners
  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    dropdownWrapper.classList.toggle("open");
  });

  window.addEventListener("resize", () => {
    redrawElement(headerEffect1);
    redrawElement(headerEffect2);
  });



})();
