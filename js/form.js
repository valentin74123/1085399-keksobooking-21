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

  let showContent = function () {
    let success = document.querySelector(`#success`);

    let clone = success.content.cloneNode(true);

    document.body.appendChild(clone);

    window.util.closeModalWindow(`.success`);
  };
  let errorForm = function () {
    let error = document.querySelector(`#error`);

    let clone = error.content.cloneNode(true);

    document.body.appendChild(clone);

    let errorButton = document.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, function () {
      document.querySelector(`.error`).remove();
    }, {once: true});

    window.util.closeModalWindow(`.error`);
  };


  let form = document.querySelector(`.ad-form`);
  let submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      window.util.mapClose();
      showContent();
      form.reset();
    }, errorForm);
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);
})();
