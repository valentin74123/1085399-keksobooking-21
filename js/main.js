'use strict';

let OFFER_TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

let OFFER_TYPES_TRANSLATED = [
  `Дворец`,
  `Квартира`,
  `Дом`,
  `Бунгало`
];

let OFFER_ROOMS = [
  `Одна комната`,
  `Две комнаты`,
  `Три комнаты`
];

let OFFER_GUESTS = [
  `двух гостей`,
  `одного гостя`,
  `не для гостей`
];

let OFFER_CHECKIN_CHECKOUT = [
  `12:00`,
  `13:00`,
  `14:00`
];

let OFFER_FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

let OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

let LOCATION_X = 0;
let LOCATION_X_MAX = 1200;
let LOCATION_PIN_WIDTH = 50;

let LOCATION_Y = 130;
let LOCATION_Y_MAX = 630;
let LOCATION_PIN_HEIGHT = 70;

let PRICE_MIN = 500;
let PRICE_MAX = 10000;

let APARTMENTS_COUNT = 8;
let CARDS_COUNT = 1;

let MAIN_PIN_WIDTH = 62;
let MAIN_PIN_HEIGHT = 84;

let map = document.querySelector(`.map`);
let addForm = document.querySelector(`.ad-form`);
let mapFilters = document.querySelectorAll(`.map__filter`);

let mainPin = document.querySelector(`.map__pin--main`);
let addressMainPin = document.querySelector(`#address`);

let formElements = addForm.elements;
let getElemtsDisabled = function (elements) {
  for (let i = 0; i < elements.length; ++i) {
    elements[i].setAttribute(`disabled`, `disabled`);
  }
};
getElemtsDisabled(mapFilters);
getElemtsDisabled(formElements);

let pinMainX = parseInt((mainPin.style.left), 10) + (MAIN_PIN_WIDTH * 0.5);
let pinMainY = parseInt((mainPin.style.top), 10) + (MAIN_PIN_HEIGHT * 0.5);
addressMainPin.value = pinMainX + `, ` + pinMainY;

let openMap = function () {
  map.classList.remove(`map--faded`);
  addForm.classList.remove(`ad-form--disabled`);

  let getElemtsUnDisabled = function (elements) {
    for (let i = 0; i < elements.length; ++i) {
      elements[i].removeAttribute(`disabled`);
    }
  };
  getElemtsUnDisabled(mapFilters);
  getElemtsUnDisabled(formElements);

  pinMainY = parseInt((mainPin.style.top), 10) + MAIN_PIN_HEIGHT;
  addressMainPin.value = pinMainX + `, ` + pinMainY;

  //  кнопка Опубликовать
  let buttonSubmit = document.querySelector(`.ad-form__submit`);
  let roomNumber = document.querySelector(`#room_number`);
  let capacity = document.querySelector(`#capacity`);
  let checkOption = function () {
    let roomNumberOption = roomNumber.options[roomNumber.selectedIndex].value;
    let capacityOption = capacity.options[capacity.selectedIndex].value;
    if (roomNumberOption !== capacityOption) {

      buttonSubmit.setCustomValidity(`Выбрано неравное количество комнат и мест!`);
    } else {

      buttonSubmit.setCustomValidity(``);
    }
  };

  roomNumber.addEventListener(`change`, function () {
    checkOption();
  });
  capacity.addEventListener(`change`, function () {
    checkOption();
  });

  //  отрисовка пинов
  let pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let renderPin = function (apartment) {
    let pinElement = pin.cloneNode(true);
    let elMapPinImage = pinElement.querySelector(`img`);

    elMapPinImage.src = apartment.author.avatar;
    elMapPinImage.alt = apartment.offer.title;

    pinElement.style.cssText = `left: ` + (apartment.location.x - (0.5 * LOCATION_PIN_WIDTH)) + `px; top: ` + (apartment.location.y - LOCATION_PIN_HEIGHT) + `px;`;
    return pinElement;
  };


  let pinFragment = document.createDocumentFragment();
  for (let i = 0; i < apartments.length; i++) {
    pinFragment.appendChild(renderPin(apartments[i]));
  }


  document.querySelector(`.map__pins`).appendChild(pinFragment);

  //  отрисовка карточек
  let card = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let renderApartments = function (apartment) {
    let apartmentElement = card.cloneNode(true);

    apartmentElement.querySelector(`.popup__title`).textContent = apartment.offer.title;
    apartmentElement.querySelector(`.popup__text--address`).textContent = apartment.offer.address;
    apartmentElement.querySelector(`.popup__text--price`).textContent = apartment.offer.price + `₽/ночь`;
    apartmentElement.querySelector(`.popup__type`).textContent = translatedOfferTypes.get(apartment.offer.type);
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


  let apartmentsFragment = document.createDocumentFragment();
  for (let i = 0; i < CARDS_COUNT; i++) {
    apartmentsFragment.appendChild(renderApartments(apartments[i]));
  }


  document.querySelector(`.map__pins`).appendChild(apartmentsFragment);
};

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    openMap();
  }
});
mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openMap();
  }
});


let translatedOfferTypes = new Map();
for (let i = 0; i < OFFER_TYPES.length; i++) {
  translatedOfferTypes.set(OFFER_TYPES[i], OFFER_TYPES_TRANSLATED[i]);
}

let randomInteger = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

let deleteRepetitions = function (arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
};

let generateApartments = function (count) {
  let apartments = [];

  for (let apartmentNumber = 1; apartmentNumber <= count; apartmentNumber++) {
    let generateFeatures = [];
    let lengthFeatures = randomInteger(1, OFFER_FEATURES.length);
    for (let i = 0; i < lengthFeatures; i++) {
      generateFeatures.push(OFFER_FEATURES[randomInteger(0, OFFER_FEATURES.length - 1)]);
    }

    let generatePhotos = [];
    let lengthPhotos = randomInteger(1, OFFER_PHOTOS.length);
    for (let i = 0; i < lengthPhotos; i++) {
      generatePhotos.push(OFFER_PHOTOS[randomInteger(0, OFFER_PHOTOS.length - 1)]);
    }

    let locationAddress = {
      x: randomInteger(LOCATION_X + LOCATION_PIN_WIDTH, LOCATION_X_MAX - LOCATION_PIN_WIDTH),
      y: randomInteger(LOCATION_Y + LOCATION_PIN_HEIGHT, LOCATION_Y_MAX - LOCATION_PIN_HEIGHT),
    };

    apartments.push({
      author: {
        avatar: `img/avatars/user0` + apartmentNumber + `.png`
      },
      location: locationAddress,
      offer: {
        title: `заголовок предложения`,
        address: locationAddress.x + `, ` + locationAddress.y,
        price: randomInteger(PRICE_MIN, PRICE_MAX),
        type: OFFER_TYPES[randomInteger(0, OFFER_TYPES.length - 1)],
        rooms: OFFER_ROOMS[randomInteger(0, OFFER_ROOMS.length - 1)],
        guests: OFFER_GUESTS[randomInteger(0, OFFER_GUESTS.length - 1)],
        checkin: OFFER_CHECKIN_CHECKOUT[randomInteger(0, OFFER_CHECKIN_CHECKOUT.length - 1)],
        checkout: OFFER_CHECKIN_CHECKOUT[randomInteger(0, OFFER_CHECKIN_CHECKOUT.length - 1)],
        features: deleteRepetitions(generateFeatures),
        description: `описание`,
        photos: deleteRepetitions(generatePhotos),
      }
    });
  }
  return apartments;
};

let apartments = generateApartments(APARTMENTS_COUNT);
