'use strict';

(function () {
  window.map = {
    generatePins() {
      window.apartments = [];


      let getAllCheckedFeatures = function () {
        let features = document.querySelector(`#housing-features`).querySelectorAll(`input`);
        let checkedFeatures = [];
        for (let i = 0; i < features.length; i++) {
          if (features[i].checked) {
            checkedFeatures.push(features[i].value);
          }
        }
        return checkedFeatures;
      };


      // let apartmentSelect = function (housing, type) {
      //   let select = document.querySelector(housing);
      //   let apartmentOption = select.options[select.selectedIndex].value;
      //   if (apartmentOption !== `any`){
      //     allApartments = allApartments.filter(function (apartment) {
      //       return apartmentOption === String(apartment.offer[`.type`]);
      //     });
      //   }
      // }
      // apartmentSelect(`#housing-type`, type);

      let mapFilters = document.querySelector(`.map__filters`);
      mapFilters.addEventListener(`change`, function (evt) {
        window.closeCard();

        let allApartments = window.apartments;
        let allCheckedFeatures = getAllCheckedFeatures();
        if (evt.target.classList[0] === `map__checkbox`) {
          allApartments = allApartments.filter(function (apartment) {
            return allCheckedFeatures.filter((x) => !apartment.offer.features.includes(x)).length === 0;
          });
        }


        let apartmentType = document.querySelector(`#housing-type`);
        let apartmentTypeOption = apartmentType.options[apartmentType.selectedIndex].value;
        if (apartmentTypeOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return apartmentTypeOption === String(apartment.offer.type);
          });
        }


        let apartmentPrice = document.querySelector(`#housing-price`);
        let apartmentPriceOption = apartmentPrice.options[apartmentPrice.selectedIndex].value;
        if (apartmentPriceOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return (
              (apartmentPriceOption === `low` && apartment.offer.price < 10000) ||
              (apartmentPriceOption === `middle` && apartment.offer.price <= 50000 && apartment.offer.price >= 10000) ||
              (apartmentPriceOption === `high` && apartment.offer.price > 50000)
            );
          });
        }


        let apartmentRooms = document.querySelector(`#housing-rooms`);
        let apartmentRoomsOption = apartmentRooms.options[apartmentRooms.selectedIndex].value;
        if (apartmentRoomsOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return apartmentRoomsOption === String(apartment.offer.rooms);
          });
        }


        let apartmentGuests = document.querySelector(`#housing-guests`);
        let apartmentGuestsOption = apartmentGuests.options[apartmentGuests.selectedIndex].value;
        if (apartmentGuestsOption !== `any`) {
          allApartments = allApartments.filter(function (apartment) {
            return apartmentGuestsOption === String(apartment.offer.guests);
          });
        }

        window.debounce(window.renderPins(allApartments));
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
