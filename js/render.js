'use strict';

(function () {
  const LOCATION_PIN_WIDTH = 50;
  const LOCATION_PIN_HEIGHT = 70;

  const APARTMENTS_COUNT = 5;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);

  const isEscEvent = function (button) {
    if (button.key === `Escape`) {
      window.closeCard();
    }
  };

  window.closeCard = function () {
    if (mapPins.querySelector(`.popup`)) {
      mapPins.querySelector(`.popup`).remove();
    }
    window.removeEventListener(`keydown`, isEscEvent);
  };

  const renderPin = function (apartment) {
    const pinElement = pinTemplate.cloneNode(true);
    const elMapPinImage = pinElement.querySelector(`img`);

    elMapPinImage.src = apartment.author.avatar;
    elMapPinImage.alt = apartment.offer.title;

    pinElement.style.left = apartment.location.x - (0.5 * LOCATION_PIN_WIDTH) + `px`;
    pinElement.style.top = apartment.location.y - LOCATION_PIN_HEIGHT + `px`;
    return pinElement;
  };

  window.renderPins = function (apartments) {
    const pins = document.querySelector(`.map__pins`).querySelectorAll(`button[type]`);

    pins.forEach(function (pin) {
      pin.remove();
    });

    const takeNumber = apartments.length > APARTMENTS_COUNT ? APARTMENTS_COUNT : apartments.length;

    for (let i = 0; i < takeNumber; i++) {
      const pin = renderPin(apartments[i]);

      mapPins.appendChild(pin);
      pin.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        if (mapPins.querySelector(`.popup`)) {
          window.closeCard();
        }

        window.openCard(apartments[i]);

        window.addEventListener(`keydown`, isEscEvent);

        const buttonClose = mapPins.querySelector(`.popup`).querySelector(`.popup__close`);
        buttonClose.addEventListener(`click`, function () {
          window.closeCard();
        });
      });
    }
  };


  const renderCard = function (apartment) {
    const card = document.querySelector(`#card`).content.querySelector(`.map__card`);

    const apartmentElement = card.cloneNode(true);

    apartmentElement.querySelector(`.popup__title`).textContent = apartment.offer.title;
    apartmentElement.querySelector(`.popup__text--address`).textContent = apartment.offer.address;
    apartmentElement.querySelector(`.popup__text--price`).textContent = apartment.offer.price + `₽/ночь`;
    apartmentElement.querySelector(`.popup__type`).textContent = window.data.translatedOfferTypes.get(apartment.offer.type);
    apartmentElement.querySelector(`.popup__text--capacity`).textContent = apartment.offer.rooms + ` для ` + apartment.offer.guests;
    apartmentElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + apartment.offer.checkin + `, выезд до ` + apartment.offer.checkout;

    const features = apartmentElement.querySelector(`.popup__features`);
    const feature = features.querySelector(`.popup__feature`);
    for (let i = 0; i < apartment.offer.features.length; i++) {
      const featureElement = feature.cloneNode(true);
      featureElement.classList.add(`popup__feature--` + apartment.offer.features[i]);
      features.appendChild(featureElement);
    }
    feature.parentNode.removeChild(feature);

    apartmentElement.querySelector(`.popup__description`).textContent = apartment.offer.description;

    const photos = apartmentElement.querySelector(`.popup__photos`);
    const photo = photos.querySelector(`.popup__photo`);
    for (let i = 0; i < apartment.offer.photos.length; i++) {
      const photoElement = photo.cloneNode(true);
      photoElement.src = apartment.offer.photos[i];
      photos.appendChild(photoElement);
    }
    photo.parentNode.removeChild(photo);

    apartmentElement.querySelector(`.popup__avatar`).src = apartment.author.avatar;

    return apartmentElement;
  };

  window.openCard = function (apartment) {
    const card = renderCard(apartment);
    mapPins.appendChild(card);
  };
})();
