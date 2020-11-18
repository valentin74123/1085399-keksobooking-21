'use strict';

(function () {
  const MAIN_PIN_DEFAULT_MULTIPLIER = 1;
  const MAIN_PIN_ALTERED_MULTIPLIER = 0.5;

  const map = document.querySelector(`.map`);
  const addForm = document.querySelector(`.ad-form`);

  const mainPin = document.querySelector(`.map__pin--main`);


  const formElements = addForm.elements;

  window.util.mapClose();


  window.pin.getMainPinCoords(MAIN_PIN_ALTERED_MULTIPLIER);

  const openMap = function () {
    map.classList.remove(`map--faded`);


    window.pin.getMainPinCoords(MAIN_PIN_DEFAULT_MULTIPLIER);


    addForm.classList.remove(`ad-form--disabled`);


    window.form.getElementsEnabled(formElements);


    window.form.typeOfHousing.addEventListener(`change`, function () {
      window.form.changePricePerNight();
    });


    window.form.timeIn.addEventListener(`change`, function () {
      window.form.changeTime(window.form.timeOut, window.form.timeIn.value);
    });
    window.form.timeOut.addEventListener(`change`, function () {
      window.form.changeTime(window.form.timeIn, window.form.timeOut.value);
    });

    window.form.checkOption();
    window.form.roomNumber.addEventListener(`change`, function () {
      window.form.checkOption();
    });
    window.form.capacity.addEventListener(`change`, function () {
      window.form.checkOption();
    });


  };
  window.util.mousedownPins(mainPin, openMap);


  window.util.mousedownOpen(mainPin, openMap);
  window.util.isEnterOpenMap(mainPin, openMap);

  window.util.mousedownMove(mainPin);
})();
