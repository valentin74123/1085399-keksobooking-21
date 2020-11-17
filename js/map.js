'use strict';

(function () {
  const FORM_LOWER_PRICE = 10000;
  const FORM_UPPER_PRICE = 50000;

  const features = document.querySelector(`#housing-features`).querySelectorAll(`input`);

  window.map = {
    generatePins() {
      window.apartments = [];


      const getAllCheckedFeatures = function () {
        const checkedFeatures = [];
        for (let i = 0; i < features.length; i++) {
          if (features[i].checked) {
            checkedFeatures.push(features[i].value);
          }
        }
        return checkedFeatures;
      };


      const mapFilters = document.querySelector(`.map__filters`);
      mapFilters.addEventListener(`change`, function (evt) {
        window.closeCard();

        let allApartments = window.apartments;
        const allCheckedFeatures = getAllCheckedFeatures();
        if (evt.target.classList[0] === `map__checkbox`) {
          allApartments = allApartments.filter(function (apartment) {
            return allCheckedFeatures.filter(function (x) {
              return !apartment.offer.features.includes(x);
            }).length === 0;
          });
        }


        const apartmentType = document.querySelector(`#housing-type`);
        const apartmentTypeOption = apartmentType.options[apartmentType.selectedIndex].value;
        if (apartmentTypeOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return apartmentTypeOption === String(apartment.offer.type);
          });
        }


        const apartmentPrice = document.querySelector(`#housing-price`);
        const apartmentPriceOption = apartmentPrice.options[apartmentPrice.selectedIndex].value;
        if (apartmentPriceOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return (
              (apartmentPriceOption === `low` && apartment.offer.price < FORM_LOWER_PRICE) ||
              (apartmentPriceOption === `middle` && apartment.offer.price <= FORM_UPPER_PRICE && apartment.offer.price >= FORM_LOWER_PRICE) ||
              (apartmentPriceOption === `high` && apartment.offer.price > FORM_UPPER_PRICE)
            );
          });
        }


        const apartmentRooms = document.querySelector(`#housing-rooms`);
        const apartmentRoomsOption = apartmentRooms.options[apartmentRooms.selectedIndex].value;
        if (apartmentRoomsOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return apartmentRoomsOption === String(apartment.offer.rooms);
          });
        }


        const apartmentGuests = document.querySelector(`#housing-guests`);
        const apartmentGuestsOption = apartmentGuests.options[apartmentGuests.selectedIndex].value;
        if (apartmentGuestsOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return apartmentGuestsOption === String(apartment.offer.guests);
          });
        }

        window.util.debounce(window.renderPins, allApartments);
      });


      const successHandler = function (data) {
        window.apartments = data;
        window.renderPins(window.apartments);
        window.form.getElementsEnabled(mapFilters);
        window.form.getElementsEnabled(features);
      };
      const errorHandler = function (errorMessage) {
        window.util.createErrorMessage(errorMessage);
      };
      window.backend.load(successHandler, errorHandler);
    }
  };
})();
