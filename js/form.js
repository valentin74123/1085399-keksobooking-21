'use strict';

(function () {
  window.getElemtsDisabled = function (elements) {
    for (let i = 0; i < elements.length; ++i) {
      elements[i].setAttribute(`disabled`, `disabled`);
    }
  };

  window.getElemtsUnDisabled = function (elements) {
    for (let i = 0; i < elements.length; ++i) {
      elements[i].removeAttribute(`disabled`);
    }
  };


  window.typeOfHousing = document.querySelector(`#type`);
  let pricePerNight = document.querySelector(`#price`);

  let priceValue = function (placeholder, min) {

    pricePerNight.placeholder = placeholder;
    pricePerNight.min = min;
  };

  window.changePricePerNight = function () {
    let typeOfHousingOption = window.typeOfHousing.options[window.typeOfHousing.selectedIndex].value;
    if (typeOfHousingOption === `bungalow`) {
      priceValue(`0`, 0);
    } else if (typeOfHousingOption === `flat`) {
      priceValue(`1000`, 1000);
    } else if (typeOfHousingOption === `house`) {
      priceValue(`5000`, 5000);
    } else if (typeOfHousingOption === `palace`) {
      priceValue(`10000`, 10000);
    }
  };


  window.timeIn = document.querySelector(`#timein`);
  window.timeOut = document.querySelector(`#timeout`);
  window.changeTime = function (time, value) {
    time.value = value;
  };


  window.roomNumber = document.querySelector(`#room_number`);
  window.capacity = document.querySelector(`#capacity`);
  window.checkOption = function () {
    let roomNumberOption = window.roomNumber.options[window.roomNumber.selectedIndex].value;
    let capacityOption = window.capacity.options[window.capacity.selectedIndex].value;
    if (roomNumberOption !== capacityOption) {
      window.roomNumber.setCustomValidity(`Количество комнат и мест должны быть равны!`);
    } else {
      window.roomNumber.setCustomValidity(``);
    }
  };
})();
