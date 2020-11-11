'use strict';

window.map = {
  generatePinsAndCards() {

    window.apartments = [];


    let mapPins = document.querySelector(`.map__pins`);
    let pins = mapPins.querySelectorAll(`button[type]`);

    let apartmentType = document.querySelector(`#housing-type`);
    apartmentType.addEventListener(`change`, function () {
      let apartmentTypeOption = apartmentType.options[apartmentType.selectedIndex].value;

      let filteredApartments = window.apartments.filter(function (apartment) {
        return apartmentTypeOption === apartment.offer.type;
      });


      filteredApartments = apartmentTypeOption === `any` ? window.apartments : filteredApartments;

      window.renderPins(filteredApartments);
    });


    let successHandler = function (data) {
      window.apartments = data;
      window.renderPins(window.apartments);
    };
    let errorHandler = function (errorMessage) {
      window.util.createErrorMessage(errorMessage);
    };
    window.backend.load(successHandler, errorHandler);


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


    for (let i = 0; i < pins.length; i++) {
      pins[i].addEventListener(`click`, function (evt) {
        evt.preventDefault();

        window.renderCards(window.apartments);

        let isEscEvent = function (button) {
          if (button.key === `Escape`) {
            closeCard();
          }
        };
        window.addEventListener(`keydown`, isEscEvent);

        let closeCard = function () {
          mapPins.querySelector(`.popup`).remove();
          window.removeEventListener(`keydown`, isEscEvent);
        };

        if (mapPins.querySelector(`.popup`)) {
          closeCard();
        }


        let buttonClose = mapPins.querySelector(`.popup`).querySelector(`.popup__close`);
        buttonClose.addEventListener(`click`, function () {
          closeCard();
        });
      });
    }
  }
};

