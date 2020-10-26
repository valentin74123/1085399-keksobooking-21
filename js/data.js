'use strict';

(function () {
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

  let LOCATION_X = 0;
  let LOCATION_PIN_WIDTH = 50;
  let LOCATION_X_MAX = 1200;

  let LOCATION_Y = 130;
  let LOCATION_PIN_HEIGHT = 70;
  let LOCATION_Y_MAX = 630;

  let PRICE_MIN = 500;
  let PRICE_MAX = 10000;


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

  window.translatedOfferTypes = new Map();
  for (let i = 0; i < OFFER_TYPES.length; i++) {
    window.translatedOfferTypes.set(OFFER_TYPES[i], OFFER_TYPES_TRANSLATED[i]);
  }

  window.generateApartments = function (count) {
    window.apartments = [];

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

      window.apartments.push({
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
    return window.apartments;
  };
})();
