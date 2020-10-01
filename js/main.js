'use strict';

let OFFER_TYPE = [
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

let OFFER_CHECKIN = [
  `12:00`,
  `13:00`,
  `14:00`
];

let OFFER_CHECKOUT = [
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

let LOCATION_X = 100;
let LOCATION_X_MAX = 900;
let LOCATION_OFFSET_X = 20;

let LOCATION_Y = 130;
let LOCATION_Y_MAX = 500;
let LOCATION_OFFSET_Y = 20;

let APARTMENTS_COUNT = 8;

let map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

let pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let renderPin = function (apartment) {
  let pinElement = pin.cloneNode(true);

  pinElement.style.cssText = `left: ` + (apartment.location.x + LOCATION_OFFSET_X) + `px; top: ` + (apartment.location.y + LOCATION_OFFSET_Y) + `px;`;
  pinElement.getElementsByTagName(`IMG`).src = apartment.author.avatar;
  pinElement.getElementsByTagName(`IMG`).alt = apartment.offer.title;
  return pinElement;
};

let randomInteger = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

let unique = function (arr) {
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
    let location_ = {
      x: LOCATION_X + Math.floor(Math.random() * Math.floor(LOCATION_X_MAX)),
      y: LOCATION_Y + Math.floor(Math.random() * Math.floor(LOCATION_Y_MAX)),
    };

    let features = [];
    let lengthFeatures = randomInteger(1, OFFER_FEATURES.length);
    for (let i = 0; i < lengthFeatures; i++) {
      features.push(OFFER_FEATURES[randomInteger(0, OFFER_FEATURES.length - 1)]);
    }

    let photos = [];
    let lengthphotos = randomInteger(1, OFFER_PHOTOS.length);
    for (let i = 0; i < lengthphotos; i++) {
      photos.push(OFFER_PHOTOS[randomInteger(0, OFFER_PHOTOS.length - 1)]);
    }


    apartments.push({
      author: {
        avatar: `img/avatars/user0` + apartmentNumber + `.png`
      },
      location: location_,
      offer: {
        title: `заголовок предложения`,
        address: location_.x + `, ` + location_.y,
        price: `стоимость`,
        type: OFFER_TYPE[Math.floor(Math.random() * OFFER_TYPE.length)],
        rooms: OFFER_ROOMS[Math.floor(Math.random() * OFFER_ROOMS.length)],
        guests: OFFER_GUESTS[Math.floor(Math.random() * OFFER_GUESTS.length)],
        checkin: OFFER_CHECKIN[Math.floor(Math.random() * OFFER_CHECKIN.length)],
        checkout: OFFER_CHECKOUT[Math.floor(Math.random() * OFFER_CHECKOUT.length)],
        features: unique(features),
        description: `описание`,
        photos: photos,
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

