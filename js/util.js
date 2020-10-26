'use strict';

(function () {
  window.mousedownOpen = function (el, functionOpen) {
    el.addEventListener(`mousedown`, function (evt) {
      if (evt.which === 1) {
        functionOpen();
      }
    });
  };

  window.enterOpen = function (el, functionOpen) {
    el.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        functionOpen();
      }
    });
  };
})();
