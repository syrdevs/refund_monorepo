import { notification } from "antd";
import setAuth from "./setAuth";
import axios from "axios";


const codeMessage = {
  200: "Сервер успешно возвратил запрошенные данные. ",
  201: "Новые или измененные данные успешны. ",
  202: "Запрос вошел в фоновую очередь (асинхронная задача). ",
  204: "Удалите данные успешно. ",
  400: "Запрос был отправлен с ошибкой. Сервер не выполнял никаких операций для создания или изменения данных. ",
  401: "Пользователь не имеет разрешения (токен, имя пользователя, пароль неверны). ",
  403: "Пользователь авторизован, но доступ запрещен. ",
  404: "Запрос был сделан для записи, которая не существует, и сервер не работал. ",
  406: "Формат запроса недоступен. ",
  410: "Запрошенный ресурс удаляется навсегда и больше не будет получен. ",
  422: "При создании объекта произошла ошибка проверки. ",
  500: "Сервер имеет ошибку, пожалуйста, проверьте сервер. ",
  502: "Ошибка шлюза. ",
  503: "Услуга недоступна, сервер временно перегружен или поддерживается. ",
  504: "Нет дотупа к серверу. "
};

const checkStatus = response => {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }


  const errortext = codeMessage[response.status] || response.statusText;
  if (response.status >= 500)
    notification.error({
      // message: `Ошибка ${response.status}: ${response.url}`,
      message: `Ошибка статус ${response.status}`,
      description: "Сервис временно недоступен"
    });

  if (response.status === 400 || (response.status >= 402 && response.status < 500)) {

    if (response.statusText !== "Forbidden") {
      response.clone().json().then((r) => {
        notification.error({
          // message: `Ошибка ${response.status}: ${response.url}`,
          message: `Ошибка статус ${response.status}`,
          description: r.Message
        });
      });
    }
    else {
      //router.push('/exception/403');
    }
    return response;
  }

  const error = new Error(errortext);
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
export default function request(url, option) {
  const options = {
    // expirys: isAntdPro(),
    ...option
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
    // const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
    // // const hashcode = hash
    // //   .sha256()
    // //   .update(fingerprint)
    // //   .digest('hex');

  const defaultOptions = {
      credentials: "include"
    };
  const newOptions = {
    ...defaultOptions, ...options
  };
  // if (
  //   newOptions.method === "POST" ||
  //   newOptions.method === "PUT" ||
  //   newOptions.method === "DELETE"
  // ) {
  //   if (!(newOptions.body instanceof FormData)) {
  //     newOptions.headers = {
  //       Accept: "application/json",
  //       "Content-Type": "application/json; charset=utf-8",
  //       ...newOptions.headers
  //     };
  //     newOptions.body = JSON.stringify(newOptions.body);
  //   } else {
  //     // newOptions.body is FormData
  //     newOptions.headers = {
  //       Accept: "application/json",
  //       ...newOptions.headers
  //     };
  //   }
  // }

  const authToken = setAuth(true);

  if (authToken) {
    newOptions.headers = {
      Authorization: "Bearer " + authToken,
      ...newOptions.headers
    };
  } else {
    if (newOptions.headers && newOptions.headers.Authorization)
      delete newOptions.headers.Authorization;
  }

  // axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("AUTH_TOKEN");

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
  let baseUrl = "http://185.27.192.177:6307";

  newOptions.url = baseUrl + url;
  newOptions.data = newOptions.body;

  return axios(newOptions)
  //.then(checkStatus)
  //.then(response => cachedSave(response, hashcode))
    .then(response => {

      if (newOptions.getResponse) {
        newOptions.getResponse(response);
      }

      // // DELETE and 204 do not return data by default
      // // using .json will report an error.
      // if (newOptions.method === "DELETE" || response.status === 204) {
      //   return response.text();
      // }

      return response.data;
    })
    .catch(e => {

      //const status = e.status;

      // if (status === 401) {
      //   // @HACK
      //   /* eslint-disable no-underscore-dangle */
      //
      //   window.g_app._store.dispatch({
      //     type: "login/logout"
      //   });
      //
      //   return {
      //     status: status,
      //     message: e
      //   };
      // }
      // // environment should not be used
      // if (status === 403) {
      //   //router.push('/exception/403');
      //   return;
      // }
      // if (status <= 504 && status >= 500) {
      //   //router.push('/exception/500');
      //   return;
      // }
      // if (status >= 404 && status < 422) {
      //   //router.push('/exception/404');
      // }

      if (newOptions.getResponse && e.response) {
        newOptions.getResponse(e.response);
      }
      return {
        getResponseValue:()=>{
          return e.response;
        },
        error: true,
        status: e.response && e.response.status ? e.response.status : null,
        message: e.response && e.response.statusText ? e.response.statusText : null
      };
    });
}
