'use strict';

let OFFER_TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

let OFFER_ROOMS = [
  `Одна комната`,
  `Две комнаты`,
  `Три комнаты`
];

let OFFER_GUESTS = [
  `Два гостя`,
  `Один гость`,
  `Не для гостей`
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
let LOCATION_OFFSET_X = 50;

let LOCATION_Y = 130;
let LOCATION_Y_MAX = 630;
let LOCATION_OFFSET_Y = 70;

let APARTMENTS_COUNT = 8;

let map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

let pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let renderPin = function (apartment) {
  let pinElement = pin.cloneNode(true);

  pinElement.style.cssText = `left: ` + (apartment.location.x - (0.5 * LOCATION_OFFSET_X)) + `px; top: ` + (apartment.location.y - LOCATION_OFFSET_Y) + `px;`;
  pinElement.getElementsByTagName(`IMG`).src = apartment.author.avatar;
  pinElement.getElementsByTagName(`IMG`).alt = apartment.offer.title;
  return pinElement;
};

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


    apartments.push({
      author: {
        avatar: `img/avatars/user0` + apartmentNumber + `.png`
      },
      location: {
        x: randomInteger(LOCATION_X + LOCATION_OFFSET_X, LOCATION_X_MAX - LOCATION_OFFSET_X),
        y: randomInteger(LOCATION_Y + LOCATION_OFFSET_Y, LOCATION_Y_MAX - LOCATION_OFFSET_X),
      },
      offer: {
        title: `заголовок предложения`,
        address: location.x + `, ` + location.y,
        price: Number(`1`),
        type: OFFER_TYPES[randomInteger(0, OFFER_TYPES.length - 1)],
        rooms: OFFER_ROOMS[randomInteger(0, OFFER_ROOMS.length - 1)],
        guests: OFFER_GUESTS[randomInteger(0, OFFER_GUESTS.length)],
        checkin: OFFER_CHECKIN_CHECKOUT[randomInteger(0, OFFER_CHECKIN_CHECKOUT.length - 1)],
        checkout: OFFER_CHECKIN_CHECKOUT[randomInteger(0, OFFER_CHECKIN_CHECKOUT.length - 1)],
        features: deleteRepetitions(generateFeatures),
        description: `описание`,
        photos: generatePhotos,
      }
    });
  }
  return apartments;
};

let apartments = generateApartments(APARTMENTS_COUNT);

let pinFragment = document.createDocumentFragment();
for (let i = 0; i < apartments.length; i++) {
  pinFragment.appendChild(renderPin(apartments[i]));
}

document.querySelector(`.map__pins`).appendChild(pinFragment);

