'use strict';

(function () {
  window.util = {
    mousedownOpen(el, functionOpen) {
      el.addEventListener(`mousedown`, function (evt) {
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

          let map = document.querySelector(`.map`);

          if (parseInt(el.style.top, 10) < 130 || parseInt(el.style.top, 10) > 630 || parseInt(el.style.left, 10) < 0 || parseInt(el.style.left, 10) > 1200) {
            map.classList.add(`map--faded`);
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


    mousedownOpenDelete(el) {
      el.removeEventListener(`mousedown`, window.util.mousedownOpen);
    }
  };
})();
