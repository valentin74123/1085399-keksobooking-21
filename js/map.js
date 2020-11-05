'use strict';

window.map = {
  generatePinsAndCards() {
    const LOCATION_PIN_WIDTH = 50;
    const LOCATION_PIN_HEIGHT = 70;
    const APARTMENTS_COUNT = 8;
    // let apartments = window.data.generateApartments(APARTMENTS_COUNT);

    let pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

    let renderPin = function (apartment) {
      let pinElement = pin.cloneNode(true);
      let elMapPinImage = pinElement.querySelector(`img`);

      elMapPinImage.src = apartment.author.avatar;
      elMapPinImage.alt = apartment.offer.title;

      pinElement.style.cssText = `left: ` + (apartment.location.x - (0.5 * LOCATION_PIN_WIDTH)) + `px; top: ` + (apartment.location.y - LOCATION_PIN_HEIGHT) + `px;`;
      return pinElement;
    };

    let mapPins = document.querySelector(`.map__pins`);

    let successHandler = function (apartments) {
      let pinFragment = document.createDocumentFragment();

      for (let i = 0; i < APARTMENTS_COUNT; i++) {
        pinFragment.appendChild(renderPin(apartments[i]));
      }

      mapPins.appendChild(pinFragment);
    };
    let errorHandler = function (errorMessage) {
      let node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    };
    window.backend.load(successHandler, errorHandler);

    let card = document.querySelector(`#card`).content.querySelector(`.map__card`);
    let renderCards = function (apartment) {
      let apartmentElement = card.cloneNode(true);

      apartmentElement.querySelector(`.popup__title`).textContent = apartment.offer.title;
      apartmentElement.querySelector(`.popup__text--address`).textContent = apartment.offer.address;
      apartmentElement.querySelector(`.popup__text--price`).textContent = apartment.offer.price + `₽/ночь`;
      apartmentElement.querySelector(`.popup__type`).textContent = window.data.translatedOfferTypes.get(apartment.offer.type);
      apartmentElement.querySelector(`.popup__text--capacity`).textContent = apartment.offer.rooms + ` для ` + apartment.offer.guests;//
      apartmentElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + apartment.offer.checkin + `, выезд до ` + apartment.offer.checkout;

      let features = apartmentElement.querySelector(`.popup__features`);
      let feature = features.querySelector(`.popup__feature`);
      for (let i = 0; i < apartment.offer.features.length; i++) {
        let featureElement = feature.cloneNode(true);
        featureElement.classList.add(`popup__feature--` + apartment.offer.features[i]);
        features.appendChild(featureElement);
      }
      feature.parentNode.removeChild(feature);

      apartmentElement.querySelector(`.popup__description`).textContent = apartment.offer.description;

      let photos = apartmentElement.querySelector(`.popup__photos`);
      let photo = photos.querySelector(`.popup__photo`);
      for (let i = 0; i < apartment.offer.photos.length; i++) {
        let photoElement = photo.cloneNode(true);
        photoElement.src = apartment.offer.photos[i];
        photos.appendChild(photoElement);
      }
      photo.parentNode.removeChild(photo);

      apartmentElement.querySelector(`.popup__avatar`).src = apartment.author.avatar;

      return apartmentElement;
    };


    let pins = mapPins.querySelectorAll(`button[type]`);

    for (let i = 0; i < pins.length; i++) {
      pins[i].addEventListener(`click`, function (evt) {
        evt.preventDefault();

        let apartmentsFragment = document.createDocumentFragment();

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


        apartmentsFragment.appendChild(renderCards(window.apartments[i]));
        mapPins.appendChild(apartmentsFragment);

        let buttonClose = mapPins.querySelector(`.popup`).querySelector(`.popup__close`);
        buttonClose.addEventListener(`click`, function () {
          closeCard();
        });
      });
    }
  }
};

