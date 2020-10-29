'use strict';

let map = document.querySelector(`.map`);
let addForm = document.querySelector(`.ad-form`);
let mapFilters = document.querySelectorAll(`.map__filter`);

let mainPin = document.querySelector(`.map__pin--main`);


//  валидация формы
let formElements = addForm.elements;

window.form.getElemtsDisabled(mapFilters);
window.form.getElemtsDisabled(formElements);

//  главный пин координаты
window.pin.pinMainCoords(0.5);

let openMap = function () {
  map.classList.remove(`map--faded`);

  //  главный пин координаты при открытии
  window.pin.pinMainCoords(1);

  //  валидация формы
  (function () {
    addForm.classList.remove(`ad-form--disabled`);

    window.form.getElemtsUnDisabled(mapFilters);
    window.form.getElemtsUnDisabled(formElements);


    window.form.typeOfHousing.addEventListener(`change`, function () {
      window.form.changePricePerNight();
    });


    window.form.timeIn.addEventListener(`change`, function () {
      window.form.changeTime(window.form.timeOut, window.form.timeIn.value);
    });
    window.form.timeOut.addEventListener(`change`, function () {
      window.form.changeTime(window.form.timeIn, window.form.timeOut.value);
    });


    window.form.roomNumber.addEventListener(`change`, function () {
      window.form.checkOption();
    });
    window.form.capacity.addEventListener(`change`, function () {
      window.form.checkOption();
    });
  })();

  window.util.mousedownOpenDelete(mainPin);
  window.map.generatePinsAndCards();
};

//  активация по нажатию на главный пин
window.util.mousedownOpen(mainPin, openMap);
window.util.enterOpen(mainPin, openMap);

window.util.mousedownMove(mainPin);

