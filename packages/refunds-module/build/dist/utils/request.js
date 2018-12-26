"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;

var _antd = require("antd");

var _setAuth = _interopRequireDefault(require("./setAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var codeMessage = {
  200: 'Сервер успешно возвратил запрошенные данные. ',
  201: 'Новые или измененные данные успешны. ',
  202: 'Запрос вошел в фоновую очередь (асинхронная задача). ',
  204: 'Удалите данные успешно. ',
  400: 'Запрос был отправлен с ошибкой. Сервер не выполнял никаких операций для создания или изменения данных. ',
  401: 'Пользователь не имеет разрешения (токен, имя пользователя, пароль неверны). ',
  403: 'Пользователь авторизован, но доступ запрещен. ',
  404: 'Запрос был сделан для записи, которая не существует, и сервер не работал. ',
  406: 'Формат запроса недоступен. ',
  410: 'Запрошенный ресурс удаляется навсегда и больше не будет получен. ',
  422: 'При создании объекта произошла ошибка проверки. ',
  500: 'Сервер имеет ошибку, пожалуйста, проверьте сервер. ',
  502: 'Ошибка шлюза. ',
  503: 'Услуга недоступна, сервер временно перегружен или поддерживается. ',
  504: 'Нет дотупа к серверу. '
};

var checkStatus = function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  var errortext = codeMessage[response.status] || response.statusText;
  if (response.status >= 500) _antd.notification.error({
    // message: `Ошибка ${response.status}: ${response.url}`,
    message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441 ".concat(response.status),
    description: 'Сервис временно недоступен'
  });

  if (response.status === 400 || response.status >= 402 && response.status < 500) {
    if (response.statusText !== 'Forbidden') {
      response.clone().json().then(function (r) {
        _antd.notification.error({
          // message: `Ошибка ${response.status}: ${response.url}`,
          message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441 ".concat(response.status),
          description: r.Message
        });
      });
    } else {//router.push('/exception/403');
    }

    return response;
  }

  var error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */


function request(url, option) {
  var options = _objectSpread({}, option);
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  // const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  // // const hashcode = hash
  // //   .sha256()
  // //   .update(fingerprint)
  // //   .digest('hex');


  var defaultOptions = {
    credentials: 'include'
  };

  var newOptions = _objectSpread({}, defaultOptions, options);

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = _objectSpread({
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }, newOptions.headers);
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = _objectSpread({
        Accept: 'application/json'
      }, newOptions.headers);
    }
  }

  var authToken = (0, _setAuth.default)(true);

  if (authToken) {
    newOptions.headers = _objectSpread({
      Authorization: 'Bearer ' + authToken
    }, newOptions.headers);
  } else {
    if (newOptions.headers && newOptions.headers.Authorization) delete newOptions.headers.Authorization;
  }
  /*const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  */


  return fetch(url, newOptions).then(checkStatus) //.then(response => cachedSave(response, hashcode))
  .then(function (response) {
    // DELETE and 204 do not return data by default
    // using .json will report an error.
    if (newOptions.method === 'DELETE' || response.status === 204) {
      return response.text();
    }

    return response.json();
  }).catch(function (e) {
    var status = e.name;

    if (status === 401) {
      // @HACK

      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'login/logout'
      });

      return {
        status: status,
        message: e
      };
    } // environment should not be used


    if (status === 403) {
      //router.push('/exception/403');
      return;
    }

    if (status <= 504 && status >= 500) {
      //router.push('/exception/500');
      return;
    }

    if (status >= 404 && status < 422) {//router.push('/exception/404');
    }

    return {
      status: status,
      message: e
    };
  });
}
//# sourceMappingURL=request.js.map