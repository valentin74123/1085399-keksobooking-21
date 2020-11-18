'use strict';

(function () {
  const BUNGALOW_MIN_PRICE = 0;
  const FLAT_MIN_PRICE = 1000;
  const HOUSE_MIN_PRICE = 5000;
  const PALACE_MIN_PRICE = 10000;

  const typeOfHousing = {
    bungalow: `bungalow`,
    flat: `flat`,
    house: `house`,
    palace: `palace`
  };

  const roomNumber = {
    one: `1`,
    two: `2`,
    three: `3`,
    hundred: `100`
  };

  window.form = {
    getElementsDisabled(elements) {
      for (let i = 0; i < elements.length; ++i) {
        elements[i].disabled = true;
      }
      addresInput.readOnly = true;
    },
    getElementsEnabled(elements) {
      for (let i = 0; i < elements.length; ++i) {
        elements[i].disabled = false;
      }
      addresInput.readOnly = true;
    },

    typeOfHousing: document.querySelector(`#type`),

    changePricePerNight() {
      const typeOfHousingOption = window.form.typeOfHousing.options[window.form.typeOfHousing.selectedIndex].value;
      if (typeOfHousingOption === typeOfHousing.bungalow) {
        getPriceValue(String(BUNGALOW_MIN_PRICE), BUNGALOW_MIN_PRICE);
      } else if (typeOfHousingOption === typeOfHousing.flat) {
        getPriceValue(String(FLAT_MIN_PRICE), FLAT_MIN_PRICE);
      } else if (typeOfHousingOption === typeOfHousing.house) {
        getPriceValue(String(HOUSE_MIN_PRICE), HOUSE_MIN_PRICE);
      } else if (typeOfHousingOption === typeOfHousing.palace) {
        getPriceValue(String(PALACE_MIN_PRICE), PALACE_MIN_PRICE);
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

      const roomNumberOption = window.form.roomNumber.options[window.form.roomNumber.selectedIndex].value;
      const capacityOptions = document.querySelector(`#capacity`).querySelectorAll(`option`);
      if (roomNumberOption === roomNumber.one) {
        capacityOptions[0].disabled = true;
        capacityOptions[1].disabled = true;
        capacityOptions[2].disabled = false;
        capacityOptions[3].disabled = true;
      } else if (roomNumberOption === roomNumber.two) {
        capacityOptions[0].disabled = true;
        capacityOptions[1].disabled = false;
        capacityOptions[2].disabled = false;
        capacityOptions[3].disabled = true;
      } else if (roomNumberOption === roomNumber.three) {
        capacityOptions[0].disabled = false;
        capacityOptions[1].disabled = false;
        capacityOptions[2].disabled = false;
        capacityOptions[3].disabled = true;
      } else if (roomNumberOption === roomNumber.hundred) {
        capacityOptions[0].disabled = true;
        capacityOptions[1].disabled = true;
        capacityOptions[2].disabled = true;
        capacityOptions[3].disabled = false;
      }


      for (let i = 0; i < capacityOptions.length; i++) {
        if (capacityOptions[i].disabled === false) {

          capacityOptions[i].selected = true;
          break;
        }
      }
    }
  };

  const addresInput = document.querySelector(`#address`);

  const resetBottun = document.querySelector(`.ad-form__reset`);

  resetBottun.addEventListener(`click`, function () {
    window.util.mapClose();
  });

  const pricePerNight = document.querySelector(`#price`);

  const getPriceValue = function (placeholder, min) {
    pricePerNight.placeholder = placeholder;
    pricePerNight.min = min;
  };


  const main = document.querySelector(`main`);
  const showContent = function () {
    const success = document.querySelector(`#success`);

    const clone = success.content.cloneNode(true);

    main.appendChild(clone);

    window.util.closeModalWindow(`.success`);
  };
  const getErrorForm = function () {
    const error = document.querySelector(`#error`);

    const clone = error.content.cloneNode(true);

    main.appendChild(clone);


    const errorButton = document.querySelector(`.error__button`);
    window.clickOnErrorButton = function () {
      document.querySelector(`.error`).remove();
      errorButton.removeEventListener(`click`, window.clickOnErrorButton);
      document.removeEventListener(`click`, window.removedClickEvent);
      document.removeEventListener(`keydown`, window.removedEscEvent);
    };
    errorButton.addEventListener(`click`, window.clickOnErrorButton);


    window.util.closeModalWindow(`.error`);
  };


  const form = document.querySelector(`.ad-form`);
  const submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      showContent();
      form.reset();
      window.util.mapClose();
    }, getErrorForm);
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);
})();
