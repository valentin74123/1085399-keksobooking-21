'use strict';

(function () {
  let LOCATION_X = 0;
  let LOCATION_X_MAX = 1135;

  let LOCATION_Y = 130;
  let LOCATION_Y_MAX = 630;

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
          window.map.generatePinsAndCards();
        }

      }, {once: true});
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
          if (parseInt(el.style.left, 10) < LOCATION_X) {
            el.style.left = LOCATION_X + `px`;
          }
          if (parseInt(el.style.left, 10) > LOCATION_X_MAX) {
            el.style.left = LOCATION_X_MAX + `px`;
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


    }
  };
})();
