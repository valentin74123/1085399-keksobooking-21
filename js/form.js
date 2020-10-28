'use strict';

(function () {
  window.form = {
    getElemtsDisabled(elements) {
      for (let i = 0; i < elements.length; ++i) {
        elements[i].setAttribute(`disabled`, `disabled`);
      }
    },
    getElemtsUnDisabled(elements) {
      for (let i = 0; i < elements.length; ++i) {
        elements[i].removeAttribute(`disabled`);
      }
    },

    typeOfHousing: document.querySelector(`#type`),

    changePricePerNight() {
      let typeOfHousingOption = window.form.typeOfHousing.options[window.form.typeOfHousing.selectedIndex].value;
      if (typeOfHousingOption === `bungalow`) {
        priceValue(`0`, 0);
      } else if (typeOfHousingOption === `flat`) {
        priceValue(`1000`, 1000);
      } else if (typeOfHousingOption === `house`) {
        priceValue(`5000`, 5000);
      } else if (typeOfHousingOption === `palace`) {
        priceValue(`10000`, 10000);
      }
    },

    timeIn: document.querySelector(`#timein`),
    timeOut: document.querySelector(`#timeout`),
    changeTime(time, value) {
      time.value = value;
    },

    roomNumber: document.querySelector(`#room_number`),
    capacity: document.querySelector(`#capacity`),
    checkOption() {
      let roomNumberOption = window.form.roomNumber.options[window.form.roomNumber.selectedIndex].value;
      let capacityOption = window.form.capacity.options[window.form.capacity.selectedIndex].value;
      if (roomNumberOption !== capacityOption) {
        window.form.roomNumber.setCustomValidity(`Количество комнат и мест должны быть равны!`);
      } else {
        window.form.roomNumber.setCustomValidity(``);
      }
    }
  };


  let pricePerNight = document.querySelector(`#price`);

  let priceValue = function (placeholder, min) {
    pricePerNight.placeholder = placeholder;
    pricePerNight.min = min;
  };


})();
