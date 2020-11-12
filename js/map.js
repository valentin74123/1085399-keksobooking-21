'use strict';

(function () {
  window.map = {
    generatePinsAndCards() {
      window.apartments = [];


      let apartmentType = document.querySelector(`#housing-type`);
      apartmentType.addEventListener(`change`, function () {
        window.closeCard();

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


    }
  };
})();
