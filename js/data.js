'use strict';

(function () {
  const OFFER_TYPES = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];

  const OFFER_TYPES_TRANSLATED = [
    `Дворец`,
    `Квартира`,
    `Дом`,
    `Бунгало`
  ];

  window.data = {
    translatedOfferTypes: new Map(),
  };

  for (let i = 0; i < OFFER_TYPES.length; i++) {
    window.data.translatedOfferTypes.set(OFFER_TYPES[i], OFFER_TYPES_TRANSLATED[i]);
  }
})();
