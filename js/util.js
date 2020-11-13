'use strict';

(function () {
  const LOCATION_X = 0;
  const LOCATION_X_MAX = 1200;
  const MAIN_PIN_WIDTH = 62;

  const LOCATION_Y = 130;
  const LOCATION_Y_MAX = 630;

  let map = document.querySelector(`.map`);
  let mapFilters = document.querySelectorAll(`.map__filter`);
  let addForm = document.querySelector(`.ad-form`);
  let formElements = addForm.elements;


  let isPinsExist = function () {
    let pins = document.querySelector(`.map__pins`).querySelectorAll(`button[type]`);
    return pins.length > 0;
  };

  window.util = {
    mousedownOpen(el, functionOpen) {
      el.addEventListener(`mousemove`, function (evt) {
        if (evt.which === 1) {
          functionOpen();
        }
      });


      el.removeEventListener(`mousedown`, function (evt) {
        if (evt.which === 1) {
          functionOpen();
        }
      });
    },

    enterOpen(el, functionOpen) {
      el.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          functionOpen();
        }
      });
    },


    mousedownPins(el, functionOpen) {
      el.addEventListener(`mousedown`, function (evt) {
        if (evt.which === 1) {
          functionOpen();
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

        let onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          daragged = true;

          let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          el.style.top = (el.offsetTop - shift.y) + `px`;
          el.style.left = (el.offsetLeft - shift.x) + `px`;


          if (parseInt(el.style.top, 10) < LOCATION_Y) {
            el.style.top = LOCATION_Y + `px`;
          }
          if (parseInt(el.style.top, 10) > LOCATION_Y_MAX) {
            el.style.top = LOCATION_Y_MAX + `px`;
          }
          if (parseInt(el.style.left, 10) < LOCATION_X - (MAIN_PIN_WIDTH * 0.5)) {
            el.style.left = LOCATION_X - (MAIN_PIN_WIDTH * 0.5) + `px`;
          }
          if (parseInt(el.style.left, 10) > LOCATION_X_MAX - (MAIN_PIN_WIDTH * 0.5)) {
            el.style.left = LOCATION_X_MAX - (MAIN_PIN_WIDTH * 0.5) + `px`;
          }
        };

        let onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);

          if (daragged) {
            let onClickPreventDefault = function (clickEvt) {
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
      window.form.getElemtsDisabled(mapFilters);
      window.form.getElemtsDisabled(formElements);
      addForm.classList.add(`ad-form--disabled`);
      let mapPins = document.querySelector(`.map__pins`);
      let pins = mapPins.querySelectorAll(`button[type]`);
      pins.forEach(function (pin) {
        pin.remove();
      });
    },

    closeModalWindow(el) {
      document.addEventListener(`click`, function () {
        document.querySelector(el).remove();
      }, {once: true});
      document.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          document.querySelector(el).style.display = `none`;
        }
      }, {once: true});
    },

    createErrorMessage(errorMessage) {
      let node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    }


  };


})();
