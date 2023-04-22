(() => {
  const menuButton = document.getElementById('menu-button');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownWrapper = document.querySelector('#dropdown-wrapper');
  const headerEffect1 = document.querySelector(".header-effect");
  const headerEffect2 = document.querySelector(".container-header");

  console.log(menuButton);
  console.log(dropdownMenu);

  function redrawElement(element) {
    const display = element.style.display;
    element.style.display = "none";
    void element.offsetWidth; // Trigger a reflow, flushing the CSS changes
    element.style.display = display;
  }

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    dropdownWrapper.classList.toggle('open');
  });

  // document.getElementById('messenger-button').addEventListener('click', function() {
  //   if (isMobileDevice()) {
  //     isMessengerAppInstalled();
  //   } else {
  //     window.open('https://m.me/274598629331502', '_blank');
  //   }
  // });
  
  window.addEventListener("resize", () => {
    redrawElement(headerEffect1);
    redrawElement(headerEffect2);
  });

  // Facbook messenger mobile checker
  function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
  
  function isMessengerAppInstalled() {
    if (typeof FB !== "undefined" && FB !== null) {
      FB.getDeferredLoadState().then(function(result) {
        if (result === 'READY') {
          openMessengerInApp();
        } else {
          window.open('https://m.me/274598629331502', '_blank');
        }
      });
    } else {
      window.open('https://m.me/274598629331502', '_blank');
    }
  };
  
  function openMessengerInApp() {
    window.location.href = 'fb-messenger://user-thread/274598629331502';
  };



})()
