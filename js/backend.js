'use strict';

(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_FORM = `https://21.javascript.pages.academy/keksobooking`;


  let StatusCode = {
    OK: 200
  };
  let TIMEOUT_IN_MS = 10000;

  window.backend = {
    load(onLoad, onError) {

      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(`GET`, URL_LOAD);
      xhr.send();
    },

    save(data, onLoad, onError) {

      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });

      xhr.open(`POST`, URL_FORM);
      xhr.send(data);
    }
  };
})();
