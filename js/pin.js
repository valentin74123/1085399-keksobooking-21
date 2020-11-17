'use strict';

(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 84;
  const mainPin = document.querySelector(`.map__pin--main`);

  const addressMainPin = document.querySelector(`#address`);

  window.pin = {
    getMainPinCoords(num) {
      const pinMainX = parseInt((mainPin.style.left), 10) + (MAIN_PIN_WIDTH * 0.5);
      const pinMainY = parseInt((mainPin.style.top), 10) + (MAIN_PIN_HEIGHT * num);
      addressMainPin.value = pinMainX + `, ` + pinMainY;
    }
  };
})();
