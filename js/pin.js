'use strict';

(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 84;
  let mainPin = document.querySelector(`.map__pin--main`);

  let addressMainPin = document.querySelector(`#address`);

  window.pin = {
    pinMainCoords(num) {
      let pinMainX = parseInt((mainPin.style.left), 10) + (MAIN_PIN_WIDTH * 0.5);
      let pinMainY = parseInt((mainPin.style.top), 10) + (MAIN_PIN_HEIGHT * num);
      addressMainPin.value = pinMainX + `, ` + pinMainY;
    }
  };
})();
