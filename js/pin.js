'use strict';

(function () {
  let MAIN_PIN_WIDTH = 62;
  let MAIN_PIN_HEIGHT = 84;
  let mainPin = document.querySelector(`.map__pin--main`);

  let addressMainPin = document.querySelector(`#address`);

  window.pinMainCoords = function (num) {
    let pinMainX = parseInt((mainPin.style.left), 10) + (MAIN_PIN_WIDTH * 0.5);
    let pinMainY = parseInt((mainPin.style.top), 10) + (MAIN_PIN_HEIGHT * num);
    addressMainPin.value = pinMainX + `, ` + pinMainY;
  };
})();
