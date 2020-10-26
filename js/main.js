'use strict';

let map = document.querySelector(`.map`);
let addForm = document.querySelector(`.ad-form`);
let mapFilters = document.querySelectorAll(`.map__filter`);

let mainPin = document.querySelector(`.map__pin--main`);


//  валидация формы
let formElements = addForm.elements;

window.getElemtsDisabled(mapFilters);
window.getElemtsDisabled(formElements);

//  главный пин координаты
window.pinMainCoords(0.5);

let openMap = function () {
  map.classList.remove(`map--faded`);

  //  главный пин координаты при открытии
  window.pinMainCoords(1);

  //  валидация формы
  (function () {
    addForm.classList.remove(`ad-form--disabled`);

    window.getElemtsUnDisabled(mapFilters);
    window.getElemtsUnDisabled(formElements);


    window.typeOfHousing.addEventListener(`change`, function () {
      window.changePricePerNight();
    });


    window.timeIn.addEventListener(`change`, function () {
      window.changeTime(window.timeOut, window.timeIn.value);
    });
    window.timeOut.addEventListener(`change`, function () {
      window.changeTime(window.timeIn, window.timeOut.value);
    });


    window.roomNumber.addEventListener(`change`, function () {
      window.checkOption();
    });
    window.capacity.addEventListener(`change`, function () {
      window.checkOption();
    });
  })();

  window.zxc();
};

//  активация по нажатию на главный пин
window.mousedownOpen(mainPin, openMap);
window.enterOpen(mainPin, openMap);

