'use strict';

(function () {
  const LOCATION_X = 0;
  const LOCATION_X_MAX = 1200;
  const MAIN_PIN_WIDTH = 62;

  const LOCATION_Y = 130;
  const LOCATION_Y_MAX = 630;
  const MAIN_PIN_HEIGHT = 84;

  const START_PIN_COORDS_X = 570;
  const START_PIN_COORDS_Y = 375;
  const START_PIN_VALUE_X = 601;
  const START_PIN_VALUE_Y = 417;

  const DEBOUNCE_INTERVAL = 500;

  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const addForm = document.querySelector(`.ad-form`);
  const formElements = addForm.elements;
  const features = document.querySelector(`#housing-features`).querySelectorAll(`input`);


  const isPinsExist = function () {
    const pins = document.querySelector(`.map__pins`).querySelectorAll(`button[type]`);
    return pins.length > 0;
  };

  window.util = {
    mousedownOpen(el, func) {
      document.addEventListener(`mousemove`, function (evt) {
        if (evt.which === 1) {
          func();
        }
      });


      el.removeEventListener(`mousedown`, function (evt) {
        if (evt.which === 1) {
          func();
        }
      });
    },

    isEnterOpenMap(el, func) {
      el.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          func();
          if (!isPinsExist()) {
            window.map.generatePins();
          }
        }
      });
    },


    mousedownPins(el, func) {
      el.addEventListener(`mousedown`, function (evt) {
        if (evt.which === 1) {
          func();
          if (!isPinsExist()) {
            window.map.generatePins();
          }
        }
      });
    },

    mousedownMove(el) {
      el.addEventListener(`mousedown`, function (evt) {
        evt.preventDefault();

        let startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };


        let daragged = false;

        const onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          daragged = true;

          const shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          el.style.top = (el.offsetTop - shift.y) + `px`;
          el.style.left = (el.offsetLeft - shift.x) + `px`;


          if (parseInt(el.style.top, 10) < LOCATION_Y - MAIN_PIN_HEIGHT) {
            el.style.top = LOCATION_Y - MAIN_PIN_HEIGHT + `px`;
          }
          if (parseInt(el.style.top, 10) > LOCATION_Y_MAX - MAIN_PIN_HEIGHT) {
            el.style.top = LOCATION_Y_MAX - MAIN_PIN_HEIGHT + `px`;
          }
          if (parseInt(el.style.left, 10) < LOCATION_X - (MAIN_PIN_WIDTH * 0.5)) {
            el.style.left = LOCATION_X - (MAIN_PIN_WIDTH * 0.5) + `px`;
          }
          if (parseInt(el.style.left, 10) > LOCATION_X_MAX - (MAIN_PIN_WIDTH * 0.5)) {
            el.style.left = LOCATION_X_MAX - (MAIN_PIN_WIDTH * 0.5) + `px`;
          }
        };

        const onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);

          if (daragged) {
            const onClickPreventDefault = function (clickEvt) {
              clickEvt.preventDefault();
              el.removeEventListener(`click`, onClickPreventDefault);
            };
            el.addEventListener(`click`, onClickPreventDefault);
          }
        };


        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);
      });
    },

    mapClose() {
      map.classList.add(`map--faded`);
      window.form.getElementsDisabled(mapFilters);
      window.form.getElementsDisabled(features);
      window.form.getElementsDisabled(formElements);
      addForm.classList.add(`ad-form--disabled`);

      const mapPins = document.querySelector(`.map__pins`);
      const pins = mapPins.querySelectorAll(`button[type]`);
      pins.forEach(function (pin) {
        pin.remove();
      });

      const mainPin = document.querySelector(`.map__pin--main`);
      mainPin.style = `left: ` + START_PIN_COORDS_X + `px; top: ` + START_PIN_COORDS_Y + `px;`;

      const addresInput = document.querySelector(`#address`);
      addresInput.value = START_PIN_VALUE_X + `, ` + START_PIN_VALUE_Y;
    },

    closeModalWindow(el) {
      window.removedClickEvent = function () {
        document.querySelector(el).remove();
        document.removeEventListener(`click`, window.removedClickEvent);
        document.removeEventListener(`keydown`, window.removedEscEvent);
      };

      window.removedEscEvent = function (evt) {
        if (evt.key === `Escape`) {
          document.querySelector(el).remove();
        }
        document.removeEventListener(`click`, window.removedClickEvent);
        document.removeEventListener(`keydown`, window.removedEscEvent);
      };

      document.addEventListener(`click`, window.removedClickEvent);
      document.addEventListener(`keydown`, window.removedEscEvent);
    },

    createErrorMessage(errorMessage) {
      const node = document.createElement(`div`);
      node.style.zIndex = 100;
      node.style.margin = `0 auto`;
      node.style.textAlign = `center`;
      node.style.backgroundColor = `red`;
      node.style.color = `white`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    },


    debounce(cb, apartments) {
      let lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL, apartments);
    }
  };
})();
